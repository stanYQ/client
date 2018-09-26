import { Plaryer } from "./Prefab_Plaryer";

const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Prefab_Enemy extends cc.Component {
    @property({
        tooltip:"子弹的速度"
    })
    bulletSpeed: number = 0;

    @property({
        tooltip: "y轴加速度",
    })
    accely: number = 0;

    @property({
        tooltip:"敌机血量",
    })
    blood: number = 0;

    onLoad(){
        this.time = 0;
    }
  
    update(dt){
       this.bulletSpeed += this.accely*dt; 
       this.node.y -= this.bulletSpeed * dt; 
    }

    getEnemy(){
        return this.node.getPosition();
    }

    onPicked(){
        this.node.destroy();
    }

    getBlood(): number{
        return this.blood;
    }


    addTime(){
        this.time++;
    }

    getTime(): number{
        return this.time;        
    }

    private time: number;

}