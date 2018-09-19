import { Plaryer } from "./Prefab_Plaryer";

const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Prefab_Enemy1 extends cc.Component {
    @property({
        tooltip:"子弹的速度"
    })
    bulletSpeed: number = 0;

    @property({
        tooltip: "y轴加速度",
    })
    accely: number = 0;

    @property({
        type: cc.Node,
        tooltip: "玩家预设"
    })
    playerNode: cc.Node = null;

    update(dt){
       this.bulletSpeed += this.accely*dt; 
       this.node.y -= this.bulletSpeed * dt; 
       if(this.node.y <= -650){
           this.node.destroy();
       }

       if(this.getPlayerDistance()<=0){
           this.onPicked();
           return;
       }
  
    }
   
    getPlayerDistance(){
        const playerPos = Plaryer.getPlaryer();
        const dist = this.node.position.sub(playerPos).mag();
        return dist;
    }

    onPicked(){
        this.node.destroy();
    }

}