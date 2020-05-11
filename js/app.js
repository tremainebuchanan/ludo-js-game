class Token{
    constructor(assignedTo, avatar){
        this.assignedTo = assignedTo;
        this.avatar = avatar;
        this.currentPosition = -1;
    }

    setCurrentPosition(position){
        this.currentPosition = position;
    }

    spawn(){

    }

    kill(){

    }

    move(){

    }
}

class Player{
    constructor(name, color, avatar, startingTile){
        this.id = 0;
        this.name = name;
        this.color = color;
        this.avatar = avatar;
        this.tokens = [];
        this.path = []; //could contain token at a specific index.
        this.homePath = [];
        this.startingTile = startingTile;
        this.tokensHome = []
    }

    init(){
        for(let i = 0; i < 4; i++){
            let token = new Token(this.id, this.avatar);
            this.tokens.push(token)
        }
    }
}

class Game{
    constructor(){
        this.MAIN_PATH_SIZE = 48;
        this.mainPath = []
        this.gamePath = {
            playerOne: [],
            playerTwo: [],
            playerThree: [],
            playerFour: []
        };
        this.active = 0;
        this.currentDieRoll = [];
        this.activePiece;       
    }

    init(){
        document.querySelector('.active-text-' + this.active).textContent = 'Active Player';
        this.populateMainGamePath();
        let player = new Player("tremaine", "green", "av2");
        player.init();
        console.log(player)
    }
    
    assignPlayers(){

    }

    populateMainGamePath(){
        for(let i = 0; i < this.MAIN_PATH_SIZE; i++){
            this.mainPath.push(0);
        }
    }

    setActivePlayer(player){
        if(player === undefined){
            document.querySelector('.active-text-' + this.active).textContent = "";
            this.active = this.active + 1;
            if(this.active > 3){
                this.active = 0;
            }
        }
        document.querySelector('.showPlayer').textContent = `Active Player To Roll ${this.active}`;
        document.querySelector('.active-text-' + this.active).textContent = 'Active Player';       
    }

    rollDie(){
        console.log(this.mainPath)
       document.querySelector('.showSpawn').textContent = 'Spawning UnAvailable'
       this.currentDieRoll = []
       //let results = [];
       //results.push(Math.floor((Math.random() * 6) + 1))
       //results.push(Math.floor((Math.random() * 6) + 1))
       this.currentDieRoll.push(Math.floor((Math.random() * 6) + 1))
       this.currentDieRoll.push(Math.floor((Math.random() * 6) + 1))
       let result = document.querySelector('.dice-roll')
       result.textContent = `Player ${this.active} rolled ${this.currentDieRoll[0]} ${this.currentDieRoll[1]}`
       if(this.currentDieRoll[0] === 6 || this.currentDieRoll[1] === 6){
           document.querySelector('.showSpawn').textContent = 'Spawning Available or Additional Dice Roll';
           //If the user rolls 6, give the current player another roll
           this.setActivePlayer(this.active)
       }else{
           this.setActivePlayer();
       }
       
    }

    walk(){
        if(this.mainPath[0] === 0){
            this.mainPath[0] = 1;
        }
        // const child = document.querySelector('.tile-0').children[0]
        // let node = document.createElement('img');
        // node.src = "img/av4.png";
        // child.appendChild(node);
        //check if the next space is available (0 value)
        //if so, update the position with the value of 1
        //remove the image from the previous tile
        //add the image to the current tile

    }

    selectPiece(piece){
        let menu = document.querySelector('.menu')
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        let value;
        this.activePiece = piece.id;
        if(this.currentDieRoll[0] !== 6) value = this.currentDieRoll[0];
        else if(this.currentDieRoll[1] !== 6) value = this.currentDieRoll[1];
        if(this.currentDieRoll[0] === 6 && this.currentDieRoll[6]){
            document.querySelector('.todo').textContent = `${piece.id} Spawn and move ${this.currentDieRoll[0]} or Spawn only.`;
        }else{
            document.querySelector('.todo').textContent = `${piece.id} Spawn and move ${value} or Spawn only`;
        }   
        
    }

    spawn(){
        const spawnTile = document.querySelector('#spawn-0');
        const selectedPiece = document.querySelector(`#${this.activePiece}`);
        let playerAvatar = document.createElement('img')
        playerAvatar.src = 'img/avataaars.png';
        playerAvatar.width = '40';
        playerAvatar.height = '40';
        spawnTile.appendChild(playerAvatar)
        selectedPiece.style.display = 'none';
    }

    spawnAndMove(){

    }

    dismiss(){
        let menu = document.querySelector('.menu')
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }

    

}

const game = new Game();
game.init()

