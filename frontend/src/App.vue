// src/App.vue

<template>
  <div class="container">
    <h1 class="h1 mb-4 pt-4">{{ title }}</h1>
    <h3>€ {{funds.reduce((a,b)=>{return a + parseFloat(b.amount)}, 0)}}/{{total}}</h3>
    <div class="meter mb-4">
      <span
        v-bind:style="{ width: (funds.reduce((a,b)=>{return a + parseFloat(b.amount)}, 0)/total)*100  + '%' }"
      ></span>
    </div>
    <button @click="showForm=true" class="btn btn-primary mb-4">DONEER</button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Naam</th>
          <th scope="col">Bedrag</th>
          <th scope="col">Bericht</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(f,index) in funds" v-bind:key="f.fundid">
          <th scope="row">{{index+1}}</th>
          <td>{{f.name}}</td>
          <td>€ {{f.amount}}</td>
          <td>{{f.message}}</td>
        </tr>
      </tbody>
    </table>

    <form v-if="showForm" @submit.prevent="fund">
      <div class="form-group">
        <label for="exampleInputPassword1">Naam</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputPassword"
          placeholder="Naam"
          v-model="name"
          required
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Bedrag</label>
        <input
          type="number"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Bedrag"
          v-model="amount"
          required
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Bericht</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputPassword2"
          placeholder="Bericht"
          v-model="message"
          required
        >
      </div>
      <button @click="showForm=false" class="btn btn-secondary">cancel</button>
      <button type="submit" class="btn btn-primary">STEUN CASSEL</button>
      <footer class="footer">
      <div class="container">
        <span class="text-muted mt-5">Giften boven de €40 zijn fiscaal aftrekbaar (niet door Oil).</span>
      </div>
    </footer>
    </form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'BRENG OIL NAAR GENT💋🇹🇭',
      funds: [],
      showForm: false,
      name: '',
      amount: 0,
      message: '',
      total: 10000,
    };
  },
  mounted() {
    fetch('https://z0l80enr3f.execute-api.eu-west-1.amazonaws.com/latest/funds')
      .then(x => x.json())
      .then(funds => (this.funds = funds));
  },
  //   computed() {
  //     subtotal: () => {
  //       return this.funds.reduce((a, b) => {
  //         return a + b.amount;
  //       }, 0);
  //     };
  //   },
  methods: {
    fund() {
      fetch(
        'https://z0l80enr3f.execute-api.eu-west-1.amazonaws.com/latest/funds',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          method: 'POST',
          body: JSON.stringify({
            name: this.name,
            amount: this.amount,
            fundid: (+new Date()).toString(),
            message: this.message,
          }),
        }
      );
      this.funds.push({
        name: this.name,
        amount: this.amount,
        message: this.message,
      });
      this.amount = 0;
      this.name = '';
      this.message = '';
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.meter {
  box-sizing: content-box;
  height: 20px; /* Can be anything */
  position: relative;
  background: #555;
  -moz-border-radius: 25px;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  padding: 10px;
  width: 80%;
  margin: auto;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
}
.meter > span {
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: rgb(43, 194, 83);
  background-image: linear-gradient(
    center bottom,
    rgb(43, 194, 83) 37%,
    rgb(84, 240, 84) 69%
  );
  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}
.container {
  width: 80%;
  max-width: 720px;
  margin: 0 auto;
  height: 100%;
  overflow: auto;
  /* color: white; */

  text-align: center;
  background: rgba(255, 255, 255, 0.7);
}
label {
  color: white;
}
form {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: white;
  background-image: url('cassel.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  width: 80%;
  max-width: 720px;
  margin: 0 auto;
}
@media (max-width: 600px) {
  .container {
    width: 100%;
  }
  form {
    width: 100%;
  }
}
</style>
