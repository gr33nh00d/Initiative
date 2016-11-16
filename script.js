
(function(){

  var app = angular.module("rollForInitiative", [])

  var MainController = function($scope){
    $scope.message = "Roll For Initiative";
    $scope.count = 0;
    $scope.headers = ["Name", "Roll", "Current Hp", "Damage/Healing"]
    var allPlayers = []
    $scope.players = allPlayers;
    var roll = function(init){
      return Number(Math.floor((Math.random()*19)+1)+init);
    };

    $scope.addPlayer = function(name,init,hp){
      console.log(Number(init));
      console.log(Number(hp));
      console.log(!isNaN(Number(init)));
      if (!isNaN(Number(init)) && !isNaN(Number(hp))) {
        console.log("kek");
        allPlayers.push({name:String(name), init:Number(init), hp:Number(hp), maxHp:Number(hp)})
      }
      $scope.name=null;
      $scope.init=null;
      $scope.hp=null;
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

    $scope.resetButton = function(){
      allPlayers = [];
      $scope.players=[];
      console.log(allPlayers);
      $scope.count = 0;
    }
  };

  app.controller("MainController", ["$scope", "$http", MainController]);
}());
