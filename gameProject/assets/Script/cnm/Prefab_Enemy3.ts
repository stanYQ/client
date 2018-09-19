const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Prefab_Enemy3 extends cc.Component {
    @property({
        tooltip:"飞机的速度"
    })
    bulletSpeed: number = 0;

    @property({
        tooltip: "y轴加速度",
    })
    accely: number = 0;

    update(dt){
       this.bulletSpeed += this.accely*dt; 
       this.node.y -= this.bulletSpeed * dt; 
       if(this.node.y <= -650){
           this.node.destroy();
       }
    }
   
}