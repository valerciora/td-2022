function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        motorcycle: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/motorcycles/'+this.id).then(
            (response) => {
                this.motorcycle = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.motorcycle);

            return axios.post('http://localhost:3000/motorcycles', this.motorcycle).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  