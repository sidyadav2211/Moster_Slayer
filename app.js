const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            mosterHealth:100,
            currentRound:0,
            winner:null,
            logMessages:[],
        }

    },
    computed:{
        playerStyle(){
            if(this.playerHealth < 0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'}
        },
        mosterStyle(){
            if(this.mosterHealth < 0){
                return {width:'0%'};
            }
            return {width:this.mosterHealth + '%'}
        },
        maySpecial(){
            return this.currentRound % 3 !==0;
        }
    },
    watch:{
        playerHealth(value){
            if(value <=0 && this.mosterHealth <=0){
                this.winner ='Draw'
            }else if( value <=0 ){
                this.winner= 'moster'
            }
        },
        mosterHealth(value){
            if (value <=0 && this.playerHealth <=0) {
                this.winner='Draw'
            }else if(value <=0){
                this.winner='player'
            }
        }
    },
    methods:{
        surrender(){
            this.winner = 'moster';
        },
        startNew(){
            this.playerHealth= 100;
            this.mosterHealth=100;
            this.currentRound=0;
            this.winner=null;
            this.logMessages=[];
        },
      playerAttack(){
          this.currentRound++;
          const attack = Math.floor(Math.random() * (12-5) +5);
          this.mosterHealth -= attack;
          this.addLogMsg('player','attact',attack)
          this.mosterAttack();
      },  
      mosterAttack(){
        const attack =Math.floor(Math.random() * (15-8) + 8);
        this.playerHealth -=attack;
        this.addLogMsg('moster','attack',attack)
      },
      playerSpecialAttack(){
        this.currentRound++;
        const attackValue =Math.floor(Math.random() * ( 25-10) + 10);
        this.mosterHealth =this.mosterHealth - attackValue;
        this.addLogMsg('moster','attack',attackValue)
        this.mosterAttack();
      },
      playerHeal(){
          this.currentRound++;
          const healValue= Math.floor(Math.random() * (20 -8) + 8);
          if(this.playerHealth + healValue > 100){
              this.playerHealth =100;
          }else{
            this.playerHealth += healValue;
          }
          this.addLogMsg('player','heal',healValue)
          this.mosterAttack();
      },
      addLogMsg(who,what, value){
        this.logMessages.unshift({
            actionBy:who,
            actionType:what,
            actionValue:value
        })
      }
    }
})
app.mount('#game')