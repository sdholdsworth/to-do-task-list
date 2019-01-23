
const val = 'test connection to remote GitHub repo';

// const button = document.getElementById('test-btn');
document.querySelector('#test-btn').addEventListener('click', function(e) {

    document.getElementById('test').innerHTML = 'The button was clicked and I was changed!'
    console.log(val);
});



