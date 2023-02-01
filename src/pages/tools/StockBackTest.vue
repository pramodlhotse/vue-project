<template>
<div>
  <base-card>

    <selection>
          <span class="Name">
       <h5 class="Name">Symbol: </h5>
       <select name="symbol" id="" v-model="symbol" @change="getCurrentData">
              <option  value="NIFTY">NIFTY</option>
              <option value="BANKNIFTY">BANKNIFTY</option>
       </select>
    </span>
      <span class="Name">
      <h5 class="Name">Expiry Date: </h5>
      <select name="expiryDate1" id="" v-model="expiryDate1" @change="getCurrentData">
         <option v-for="date in this.expiryDates" v-bind:value=date.name>{{ date.name }}</option>
      </select>
      </span>
    </selection>
    <selection>
      <p>{{ currDataFetchError }}</p>
    <span class="Name">
      <h5>Strike Price : {{curStrikePrice}}</h5>
    </span>
      <span class="Name">
      <h5>LTP(CE): {{ltpce}}</h5>
    </span>
      <span class="Name">
      <h5>LTP(PE): {{ltppe}}</h5>
    </span>
      <span class="Name">
      <h5>Expiry Date : {{expiryDate}}</h5>
    </span>
    </selection>

    <br><br>
  <selection>
    <span class="filter-option">
           <v-date-picker v-model="start" mode="dateTime" is24hr>
            <template v-slot="{ inputValue, inputEvents }">
              <input
                  class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                     :value="inputValue"
                  v-on="inputEvents"
              />
            </template>
          </v-date-picker>
    </span>
  </selection>
<!--    <span class="filter-option">-->
<!--      <v-date-picker v-model="end" mode="dateTime" is24hr>-->
<!--            <template v-slot="{ inputValue, inputEvents }">-->
<!--              <input  v-bind:id="end"-->
<!--                  class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"-->
<!--                  :value="inputValue"-->
<!--                  v-on="inputEvents"-->
<!--              />-->
<!--            </template>-->
<!--          </v-date-picker>-->

<!--    </span>-->
    <div>
      <base-button @click="loadData">Find Price</base-button>
    </div>

  </base-card>
<base-card>
  <h2>Price Details</h2>
  <section>
    <base-card>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && error">{{ error }}</p>
      <p
          v-else-if="!isLoading && (!results || results.length === 0)"
      >No Result</p>
      <ul v-else>

        <NiftyData
            v-for="result in results"
            :key="result.id"
            :underlying="result.strikePrice"
            :lastPrice="result.lastPrice"
        ></NiftyData>
      </ul>
    </base-card>
  </section>
</base-card>

</div>
</template>

<script>
import BaseCard from "../../components/ui/BaseCard1.vue";
import 'v-calendar/dist/style.css';
import NiftyData from "../tools/NiftyData.vue";

export default {

  data() {
    return {
      start: new Date(),
      end: new Date()+1,
      name: '',
      startDate: '',
      endDate: '',
      isLoading: false,
      error: null,
      symbol:'NIFTY',
      curStrikePrice: '00.00',
      ltpce: '00.0',
      ltppe: '00.0',
      currDataFetchError:null,
      expiryDate:'',
      expiryDates: [],
      expiryDate1: '25-Jan-2023'
    };
  },
  methods: {
      setName(event) {
        this.name = event.target.value;
      },
    getExpiryDate() {
      alert(this.expiryDate1)
    },
    getCurrentData() {
        fetch( 'http://localhost:8080/price/curr-strike-price?symbol='+this.symbol,{
          symbol: this.symbol
        })
            .then((response) => {
          if (response.ok) {
            this.currDataFetchError = ''
            return response.json();
          }
          }).then((data) => {
            this.curStrikePrice= data.underlying
            this.ltpce = data.ltpce
            this.ltppe = data.ltppe
          this.expiryDate = data.expiryDate
        }).catch((error) => {
          console.log(error);
          this.currDataFetchError = 'Failed to fetch data - please try again later...';
        })
    },
    loadExpiryDates() {
      fetch( 'http://localhost:8080/price/expiry-dates',{

      })
          .then((response) => {
            if (response.ok) {
              this.currDataFetchError = ''
              return response.json();
            }
          }).then((data) => {
        const results = [];
        console.log(data)
        // for (const key in data) {
        //   results.push({
        //    id: id,
        //    name: date[id].name
        //
        //   });
        // }
        console.log(data)

        this.expiryDate1 = data[0].name
          this.expiryDates = data
      }).catch((error) => {
        console.log(error);
        this.currDataFetchError = 'Failed to fetch data - please try again later...';
      })
    },
    loadData() {

      this.isLoading = true;
      this.error = null;

      fetch('http://localhost:8080/price/current?start='+this.start + '&symbol='+this.symbol, {
        start: this.startDate,
        symbol: this.symbol
      })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            this.isLoading = false;
            const results = [];
            // results.push({
            //   underlying: data.underlying,
            //   last_price: data.last_price,
            // })
            for (const id in data) {
              results.push({
                id: id,
                strikePrice: data[id].strikePrice,
                lastPrice: data[id].lastPrice,
              });
            }

            console.log(results)
             this.results = results;
          })
          .catch((error) => {
            console.log(error);
            this.isLoading = false;
            this.error = 'Failed to fetch data - please try again later.';
          });
    },
  },
  mounted() {
    this.loadExpiryDates();
    this.getCurrentData();
    //this.loadData();
    window.setInterval(() => {
      this.getCurrentData()
    }, 1000)
  },

  components: { BaseCard,
                NiftyData,

   }
}
</script>


<style scoped>
h2 {
  margin: 2.0rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  horizontal-align: right;
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
.Symbol_Name {display: inline-block; width:23%; align-content: center}
.Name {display: inline-block; width:23%;}

.Name .cf-medium {width:25%;}

.Name label {display: block !important; width: 10% !important;}

</style>
