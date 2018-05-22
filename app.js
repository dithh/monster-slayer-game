new Vue({
    el: "#app",
    data: {
        isGameOn: false,
        playerHealth: 100,
        monsterHealth: 100,
        turns :[],

    },
    watch: {
        playerHealth: function (value) {

        }
    },
    methods: {
        startGame: function () {
            this.isGameOn = true;
            console.log("game is on");
            this.playerHealth = 100;
            this.monsterHealth = 100;

        },
        stopGame: function () {
            this.isGameOn = false;
            this.playerHealth = 80;
            this.monsterHealth = 80;
            this.turns =[];
        },
        playerAttack: function () {
            if (Math.random() > 0.30) {
                var damage = this.calculateDmg(3, 6);
                this.monsterHealth -= damage;
                this.turns.unshift({
                    isPlayer:true,
                    text :"Player hits for " + damage
                })


            }
            this.isGameOver();
            this.monsterAttack();
        },
        monsterAttack: function () {
            if (Math.random() > 0.20) {
                var damage = this.calculateDmg(2, 5);
                this.playerHealth -= damage;
                this.isGameOver();
                this.turns.unshift({
                    isPlayer:false,
                    text :"Monster hits for " + damage
                })
            }
        },
        playerSpecialAttack: function () {
            if (Math.random() > 0.70) {
                this.monsterHealth -= this.calculateDmg(8, 9);
                this.isGameOver();
            }
            this.monsterAttack();
        },
        playerHeal: function () {
            if (Math.random() > 0.30) {
                this.playerHealth += this.calculateDmg(2, 10);

            }
            this.monsterAttack();

        },
        calculateDmg: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        isGameOver: function () {
            if (this.playerHealth < 0) {
                this.stopGame();
                alert("Game over! You lose!");
            } else if (this.monsterHealth < 0) {
                this.stopGame();
                alert("Congratulations! You won!");
            }
        },
    },
    computed: {
        playerHealthBarColor: function () {
            if (this.playerHealth > 60) {
                return "green";
            }
            else if (60 >  this.playerHealth && this.playerHealth > 20 ){
                return "yellow";

            }
            else if (this.playerHealth <=20){
                return "red";
            }
        },
    
    monsterHealthBarColor : function(){
        if (this.monsterHealth > 60) {
            return "green";
        }
        else if (60 >  this.monsterHealth && this.playerHealth > 20 ){
            return "yellow";

        }
        else if (this.monsterHealth <=20){
            return "red";
        }
    }
},
})