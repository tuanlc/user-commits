var count = document.getElementById("count")

count.addEventListener('submit', function (e) {
    e.preventDefault()

    // var repo_list = document.getElementsByClassName("repo");
    let repo_list = $('.repo')

    var username = document.getElementById("username").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var today = Date.now()

    var since = new Date(from ? from : '1970-01-01')
    var until = new Date(to ? to : today)
    var apis = [];

    for (i = 0; i < repo_list.length; i++) {
        var api = 'https://api.github.com/repos' + repo_list[i].value.slice(18, -4) +
            '/commits' + '?page=1&per_page=100&author=' + username + '&since='
            + since.toISOString() + '&until=' + until.toISOString();
        apis.push(api)
    }

    let requests = apis.map(api => fetch(api));
    var res = []

    Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(user => user.forEach(data => {
            const number = data && data.length || 0
            res.push(number)
            return data
        }))
        .then(results => {
            var result = 0;
            for (i in res) {
                result += res[i]
            }

            document.getElementById("result").innerHTML = 'Number of commits: ' + result;
            console.log(result)
            return results;
        })
})