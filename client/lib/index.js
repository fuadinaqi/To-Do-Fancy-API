function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // localStorage.setItem('accessToken', response.authResponse.accessToken)
      testAPI();
    } else {
      localStorage.clear()
      // The person is not logged into your app or we are unable to tell.
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1604998719535888',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', { fields : 'id, name, email, gender, age_range, picture' },function(response) {
      console.log('Successful login for: ' + response.name);
      // console.log(response.picture.data.url);
      axios.post('http://localhost:3000/users/login', {
        id      : response.id,
        email   : response.email,
        name    : response.name,
        gender  : response.gender,
        age     : response.age_range.min,
        picture : response.picture.data.url
      })
      .then(resp => {
        // console.log(resp.data.token);
        localStorage.setItem('jwt', resp.data.token)
      })
      .catch(err => {
        console.log(err);
      })
    })
  }

Vue.component('home-page', {
  template: '#home-template',
  data () {
    return {
      todos: [],
      todoAdd : {
        name : '',
        dueDate : '',
      },
      todoEdit : {
        name : '',
        dueDate : ''
      },
      todoCompletes : [],
      todoIncompletes : [],
      statusComp : '',
      showHome : true,
      showComplete : false,
      showIncomplete : false,
      showEdit : false
    }
  },
  methods: {
    findMyTodos () {
      axios.get('http://localhost:3000/todos', {
        headers : { 'token' : localStorage.getItem('jwt') }
      })
      .then(response => {
        // console.log(response.data.todos)
        this.todos = response.data.todos
      })
      .catch(err => {
        console.log(err)
      })
    },
    findComplete() {
      axios.get('http://localhost:3000/todos/completed', {
        headers : { 'token' : localStorage.getItem('jwt') }
      })
      .then(response => {
        console.log(response.data.todoCompletes, 'asdasdasasd');
        this.todoCompletes = response.data.todoCompletes
      })
      .catch(err => {
        console.log(err);
      })
    },
    findUncomplete() {
      axios.get('http://localhost:3000/todos/uncompleted', {
        headers : { 'token' : localStorage.getItem('jwt') }
      })
      .then(response => {
        console.log(response.data.todoUncompletes, 'bbbbbbb');
        this.todoIncompletes = response.data.todoUncompletes
      })
      .catch(err => {
        console.log(err);
      })
    },
    createTodo () {
      axios.post('http://localhost:3000/todos/add', this.todoAdd, {
        headers : { 'token' : localStorage.getItem('jwt') }
      })
      .then(response => {
        this.todos.push(response.data.objCreate)
        this.todoAdd = {
          name : '',
          dueDate : '',
        }
      })
      .catch(err => {
        alert('Todo Name dan Due Date harus diisi :)')
        console.log(err)
      })
    },
    completeStats (todo) {
      let todoIdx = this.todos.findIndex(el_todo => {
        return el_todo._id == todo._id
      })
      this.todos[todoIdx].status = !this.todos[todoIdx].status
      axios.put(`http://localhost:3000/todos/${todo._id}/checklist`, {
        'status' : this.todos[todoIdx].status
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.error(err)
      })
    },
    editTodo () {
      let todoIdx = this.todos.findIndex(el_todo => {
        return el_todo._id == this.todoEdit._id
      })
      this.todos.splice(todoIdx, 1, this.todoEdit)
      axios.put(`http://localhost:3000/todos/${this.todoEdit._id}`, {
        'name' : this.todoEdit.name,
        'dueDate' : this.todoEdit.dueDate
      })
      .then(response => {
        console.log(response.data)
        this.isHomeTodo()
      })
      .catch(err => {
        alert('harus diisi ya')
        this.isEdit(this.todoEdit)
        console.error(err)
      })
    },
    deleteTodo (todo) {

    },
    isHomeTodo () {
      this.todoEdit = ''
      this.showHome = true
      this.showComplete = false
      this.showIncomplete = false
      this.showEdit = false
    },
    isCompleteTodo () {
      this.todoEdit = ''
      this.findComplete()
      this.showHome = false
      this.showComplete = true
      this.showIncomplete = false
      this.showEdit = false
    },
    isIncompleteTodo () {
      this.todoEdit = ''
      this.findUncomplete()
      this.showHome = false
      this.showComplete = false
      this.showIncomplete = true
      this.showEdit = false
    },
    isEdit (todo) {
      this.todoEdit = todo
      this.showHome = false
      this.showComplete = false
      this.showIncomplete = false
      this.showEdit = true
    },
    logout () {
      FB.logout()
      alert('you have logout')
    }
  },
  created () {
    this.findMyTodos()
  }
})

Vue.component('landing-page', {
  template: '#landingPage-template',
  data () {
    return {

    }
  },
  methods: {
    tes () {
      return {

      }
    }
  },
  created () {

  }
})

new Vue({
  el      : '#app',
  data    : {
    currentView: 'landing-page',
    isLogin: false,
    isFormLogin: true,
    isHome: false
  },
  methods : {
    createTodo() {
      axios.post('http://localhost:3000/todos/add' ,{
        name  : 'main komputer',
        dueDate : new Date()
      }, {
        headers : { 'token' : localStorage.getItem('jwt') }
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },
    findComplete() {
      axios.get('http://localhost:3000/todos/completed', {
        headers : { 'token' : localStorage.getItem('jwt') }
      })
      .then(response => {
        console.log(response, 'bhank');
      })
      .catch(err => {
        console.log(err);
      })
    },
    findUncomplete() {
      axios.get('http://localhost:3000/todos/uncompleted', {
        headers : { 'token' : localStorage.getItem('jwt') }
      })
      .then(response => {
        console.log(response, 'phew');
      })
      .catch(err => {
        console.log(err);
      })
    },
    checkLogin() {
      if (localStorage.getItem('jwt')) {
        this.isLogin = true
        this.isFormLogin = false
        this.isHome = true
      } else {
        this.isLogin = false
        this.isFormLogin = true
        this.isHome = false
      }
    }
  },
  created () {
    return this.checkLogin()
  }
})

// DISINI YAAAAAA TESTER DIKIT
// function findMyTodos() {
//   axios.get('http://localhost:3000/todos', {
//     headers : { 'token' : localStorage.getItem('jwt') }
//   })
//   .then(response => {
//     console.log(response.data)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }
//
// function createTodo() {
//   axios.post('http://localhost:3000/todos/add' ,{
//     name  : 'main komputer',
//     dueDate : new Date()
//   }, {
//     headers : { 'token' : localStorage.getItem('jwt') }
//   })
//   .then(response => {
//     console.log(response)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }
//
// function findComplete() {
//   axios.get('http://localhost:3000/todos/completed', {
//     headers : { 'token' : localStorage.getItem('jwt') }
//   })
//   .then(response => {
//     console.log(response, 'bhank');
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }
//
// function findUncomplete() {
//   axios.get('http://localhost:3000/todos/uncompleted', {
//     headers : { 'token' : localStorage.getItem('jwt') }
//   })
//   .then(response => {
//     console.log(response, 'phew');
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }
