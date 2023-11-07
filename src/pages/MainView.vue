<template>
  <div class="app-container">
    <div class="middle-section">
      <clickframe  class="center-pane" @click="incrementVisiteur"/>
      <div class="right-pane">
        <br>
        <div class="scrollable-container-1">
          <div>
            <ul class="list-group" style="padding: 5px">
              <li class="clist-group-item">
                <p style="color: black">💰 Visitors: {{ visiteurs }}</p>
              </li>
              <!--
              <li class="clist-group-item">
                <p style="color: black"> {{ getVisitorInc() }} V/s </p>
              </li>
              -->
              <li>
                <p style="color:black;">{{this.upgrades[0]}} Juggler (+{{ getBaseUpgrade(0) }}V/s): <button @click="buyUpgrade(0)">{{ getPrice(0) }}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[1]}} Clown (+{{ getBaseUpgrade(1) }}V/s): <button @click="buyUpgrade(1)">{{ getPrice(1) }}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[2]}} Magician (+{{ getBaseUpgrade(2) }}V/s): <button @click="buyUpgrade(2)">{{ getPrice(2) }}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[3]}} Lions (+{{ getBaseUpgrade(3) }}V/s): <button @click="buyUpgrade(3)">{{ getPrice(3) }}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[4]}} Acrobats (+{{ getBaseUpgrade(4) }}V/s): <button @click="buyUpgrade(4)">{{ getPrice(4) }}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[5]}} Sea Lion (+{{ getBaseUpgrade(5) }}V/s): <button @click="buyUpgrade(5)">{{ getPrice(5) }}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[6]}} Fire Eater (+{{ getBaseUpgrade(6) }}V/s): <button @click="buyUpgrade(6)">{{ getPrice(6)}}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[7]}} Cannon lady (+{{ getBaseUpgrade(7) }}V/s): <button @click="buyUpgrade(7)">{{ getPrice(7) }}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[8]}} M. Loyal (+{{ getBaseUpgrade(8) }}V/s): <button @click="buyUpgrade(8)">{{ getPrice(8) }}</button></p>
              </li>
              <li>
                <p style="color:black;">{{this.upgrades[9]}} Fire circle (+{{ getBaseUpgrade(9) }}V/s): <button @click="buyUpgrade(9)">{{ getPrice(9) }}</button></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-section">
      <div class="left-bottom-pane">
        <div class="scrollable-container-2">
          <div class="button-container">
            <button
                v-for="(button, index) in buttons"
                :key="index"
                :class="{ disabled: !button.isActive }"
                @click="buyButtonUpgrade(index)"
            >
              {{this.buttons[index].label}}
              <br>
              {{this.buttons_prices[index]}} V.
            </button>
          </div>
        </div>
      </div>
      <div class="right-bottom-pane">ToDo</div>
    </div>
  </div>
</template>

<script>
import Clickframe from "@/components/Clickframe.vue";

export default {
  name: 'CircusClicker',
  components: {Clickframe},
  data() {
    return {
      visiteurs: 0,
      clickValue: 50,
      upgrades: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      basePrices: [
        150,
        1000,
        5000,
        30000,
        100000,
        400000,
        2000000,
        16666666,
        1234567890,
        39999999999
      ],
      baseRate: [
        1,
        5,
        35,
        100,
        400,
        1000,
        4000,
        66666,
        98765,
        9999999
      ],
      autoUpgrade: null,
      gameRate: 1.07,
      buttons: [
        { isActive: true, isBought : false, label: "clic 2x" },
        { isActive: true, isBought : false, label: "clic 2x" },
        { isActive: true, isBought : false, label: "clic 3x" },
        { isActive: true, isBought : false, label: "clic 3x" },
        { isActive: true, isBought : false, label: "clic 4x" },
        { isActive: true, isBought : false, label: "clic 4x" },
        { isActive: true, isBought : false, label: "clic 9x" },
      ],
      buttons_prices :[
        100,
        1000,
        10000,
        500000,
        10000000,
        500000000,
        999999999999,
      ],
    };
  },
  mounted(){
    this.load();
  },
  methods: {
    load() {
      const serializedFile = sessionStorage.getItem("uploadedFile");
      if (serializedFile) {
        var obj = JSON.parse(serializedFile);

        this.visiteurs = obj.visiteurs
        this.clickValue = obj.clickValue
        this.upgrades = obj.upgrades
        this.autoUpgrade = obj.autoUpgrade
        this.buttons = obj.buttons

        this.autoUpgrade = setInterval(() => {
          for (var i = 0; i < 9; i++) {
            this.incrementUpgrade(i);
          }
          var serializedFile2 = sessionStorage.getItem("uploadedFile")
          if (serializedFile2) {
            var obj2 = JSON.parse(serializedFile2);
            obj2.visiteurs = this.visiteurs
            obj2.clickValue = this.clickValue
            obj2.upgrades = this.upgrades
            obj2.autoUpgrade = this.autoUpgrade
            obj2.buttons = this.buttons

            sessionStorage.setItem("uploadedFile", JSON.stringify(obj2));
            console.log(sessionStorage.getItem("uploadedFile"))
          }
        }, 1000);
      }
    },

    buyButton(index){
      this.buttons[index].isBought=true;
      this.buttons[index].isActive=false;
      this.visiteurs-=this.buttons_prices[index];
    },

    buyButtonUpgrade(index){
      switch (index){
        case 0:
          if((!this.buttons[index].isBought) && this.visiteurs>=this.buttons_prices[index]){
            this.buyButton(index);
            this.clickValue=this.clickValue*2;
          }
          break
        case 1:
          if((!this.buttons[index].isBought) && this.visiteurs>=this.buttons_prices[index]){
            this.buyButton(index);
            this.clickValue=this.clickValue*2;
          }
          break
        case 2:
          if((!this.buttons[index].isBought) && this.visiteurs>=this.buttons_prices[index]){
            this.buyButton(index);
            this.clickValue=this.clickValue*3;
          }
          break
        case 3:
          if((!this.buttons[index].isBought) && this.visiteurs>=this.buttons_prices[index]){
            this.buyButton(index);
            this.clickValue=this.clickValue*3;
          }
          break
        case 4:
          if((!this.buttons[index].isBought) && this.visiteurs>=this.buttons_prices[index]){
            this.buyButton(index);
            this.clickValue=this.clickValue*4;
          }
          break
        case 5:
          if((!this.buttons[index].isBought) && this.visiteurs>=this.buttons_prices[index]){
            this.buyButton(index);
            this.clickValue=this.clickValue*4;
          }
          break
        case 6:
          if((!this.buttons[index].isBought) && this.visiteurs>=this.buttons_prices[index]){
            this.buyButton(index);
            this.clickValue=this.clickValue*9;
          }
          break
      }
    },

    incrementVisiteur() {
      this.visiteurs = this.visiteurs + this.clickValue;
    },
    buyUpgrade(x) {
      var price = this.getPrice(x);
      if (this.visiteurs >= price) {
        this.visiteurs -= price;
        this.upgrades[x] += 1;
      }
    },
    incrementUpgrade(x) {
      this.visiteurs = Math.round( this.visiteurs + (this.baseRate[x] * this.upgrades[x] ) )
    },
    getPrice(x) {
      return (Math.round(this.basePrices[x] * (this.gameRate ** this.upgrades[x])));
    },
    getBaseUpgrade(x) {
      return this.baseRate[x];
    },
    getVisitorInc(){
      var value=0;
      for(var i=0;i>this.upgrades.length;i++){
        value+=(this.baseRate[i]*this.upgrades[i]);
      }
      return value;
    },
    /*
    buyAutoClickerUpgrade() {
      if (this.money >= this.autoClickerUpgradeCost) {
        this.money -= this.autoClickerUpgradeCost;
        this.autoClickerInterval -= 10;
        clearInterval(this.autoClicker);
        this.autoClicker = setInterval(() => {
          this.incrementMoney();
        }, this.autoClickerInterval);
        this.autoClickerUpgradeCost *= 3;
      }
    },
    */
  },
  beforeUnmount() {
    this.autoUpgrade = null;
  },

};

</script>

<style scoped>
.clist-group-item {
  position: relative;
  display: block;
  text-decoration: none;
}
.scrollable-container-1 {
  overflow-y: auto;
  white-space: nowrap; /* Prevent button text from wrapping */
  height: inherit;
  width: min-content;
}
.scrollable-container-2 {
  overflow-y: auto;
  white-space: nowrap; /* Prevent button text from wrapping */
  height: inherit;
}

div {
  font-size: 3vw;
  text-align: center;
}
@media screen and (min-width: 530px) {
  div {
    font-size: 15px;
    text-align: center;
  }
}

.app-container {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 100vw;
  margin-top: 25vw;
}
@media screen and (min-width: 680px) {
  .app-container {
    font-family: 'Arial', sans-serif;
    display: flex;
    flex-direction: column;
    height: 90vh;
    width: 90vw;
    margin-top: 10vw;
  }
}
.middle-section {
  display: flex;
  height: 50%;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.center-pane {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  transition: background-color 0.3s;
}

.right-pane{
  display: flex;
  width: min-content;
}

.center-pane {
  flex-direction: column;
}

.bottom-section {
  display: flex;
  height: 40%;
}

.right-bottom-pane ,.left-bottom-pane{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6e6e6;
  transition: background-color 0.3s;
}

.left-bottom-pane:hover, .right-bottom-pane:hover {
  background-color: #cccccc;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff8c00;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}
button:hover {
  background-color: #ff4500;
}
.disabled {
  display: none;
}

</style>
