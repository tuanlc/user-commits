var count = document.getElementById("count")

count.addEventListener('submit', function(e){
    e.preventDefault()
    console.log(e.value)
    var repo = document.getElementById("repo").value;
    var username = document.getElementById("username").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var today = new Date()
    
    var since = new Date(from ? from : '1970-01-01')
    var until = new Date(to ? to : (today.getFullYear() + '-' +today.getMonth()+'-'+today.getDate()))
    

    var api = 'https://api.github.com/repos' + repo.slice(18, -4) + 
    '/commits' + '?page=1&per_page=100&author=' + username + '&since=' 
    + since.toISOString() + '&until=' + until.toISOString()

    console.log(api)
    fetch(api)
    .then(result => result.json())
    .then((data) => {
        console.log(data) 
 
        const numberOfCommits = data && data.length || 0;
       
        document.getElementById("result").innerHTML = `
                <a target="_blank" href="{api}"></a>
                ` + 'Number of commits: ' + numberOfCommits;

    })
})