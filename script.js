
(function(){

  var app = angular.module("rollForInitiative", [])

  var MainController = function($scope){
    $scope.message = "Roll For Initiative";
    $scope.count = 0;
    var cloneCount = 1;
    var cloneString = '';
    $scope.headers = ["Name", "Roll","Armor Class", "Current Hp", "Damage/Healing"]
    var allPlayers = []
    $scope.players = allPlayers;
    var roll = function(init){
      return Number(Math.floor((Math.random()*19)+1)+init);
    };

    $scope.addPlayer = function(name,init,hp,ac){
      if (!isNaN(Number(init)) && !isNaN(Number(hp))) {
          allPlayers.push({name:String(name), init:Number(init), hp:Number(hp), maxHp:Number(hp), ac:Number(ac)})
      }
      $scope.name=null;
      $scope.init=null;
      $scope.hp=null;
      $scope.ac=null;
      cloneCount=1;
    };
      
    $scope.clone = function(name,init,hp,ac){
      if (!isNaN(Number(init)) && !isNaN(Number(hp))) {
          cloneString = cloneCount.toString()
          allPlayers.push({name:String(name)+cloneString, init:Number(init), hp:Number(hp), maxHp:Number(hp), ac:Number(ac)})
      }
      cloneCount=1+cloneCount;
    };
      

    $scope.hitHeal = function(index,hit){
      var newHp = allPlayers[index].hp=allPlayers[index].hp+Number(hit);
      if(!isNaN(Number(hit))){
        console.log("working");
      }
      if(newHp > allPlayers[index].maxHp){
        allPlayers[index].hp=allPlayers[index].maxHp;
      }else{
        allPlayers[index].hp=newHp
      }
      if (allPlayers[index].hp<1) {
        allPlayers.splice(index,1)
      }
      $scope.hit=null;
      console.log(hit);
    }

    $scope.button = function(){
      for (var i = 0; i < allPlayers.length; i++) {
        allPlayers[i].roll=roll(allPlayers[i].init);
      }
      allPlayers.sort(function(a,b){return (a.roll > b.roll) ? -1 : ((b.roll > a.roll) ? 1:0);});
      $scope.count++;
    }
    
    $scope.scale = function(){
      for (var i = 0; i < allPlayers.length; i++) {
        allPlayers[i].roll=allPlayers[i].roll+allPlayers[i].init;
      }
      allPlayers.sort(function(a,b){return (a.roll > b.roll) ? -1 : ((b.roll > a.roll) ? 1:0);});
      $scope.count++;
    }

    $scope.resetButton = function(){
      location.reload();
    }
  };

  app.controller("MainController", ["$scope", "$http", MainController]);
}());
