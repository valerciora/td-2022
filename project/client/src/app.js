function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      motorcycles: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => (this.motorcycles = response.data));
    },
    methods: {
      deleteMotorcycle: function(id) {
        console.log('HTTP DELETE spre backend, Motorcycle: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.motorcycles = response.data));
        });
      },
    }
  });

  indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
