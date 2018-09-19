import Prefab_Plaryer from "../cnm/Prefab_Plaryer";

const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Win_planeGame extends  cc.Component {
    @property({
        type: cc.Node,
    })
    bg1: cc.Node = null;

    @property({
        type: cc.Node,
    })
    bg2: cc.Node = null;

    @property({
        tooltip: "移动速度"
    })
    bgSpeed: number = 0.6;

    @property({
        type: cc.Prefab,
        tooltip: "子弹预设"
    })
    bulletPrefab: cc.Prefab = null;

    @property({
        type: cc.Node,
        tooltip:"玩家预设"
    })
    playerNode: cc.Node = null;

    onLoad(){
        this.bgList[0] = this.bg1;
        this.bgList[1] = this.bg2;
        this.accFire = false;
         //键盘监听
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
    }
    
    update(dt){
        this.bgMove(this.bgList, this.bgSpeed);
    }

    private onKeyDown(event){
        switch(event.keyCode){
            case cc.KEY.j:
               this.accFire = true;
               this.bulletFire();
            break;
        }
    }

    private onKeyUp(event){
        switch(event.keyCode){
            case cc.KEY.j:
                this.accFire = false;
            break;
        }

    }

    private bulletFire(){
        if(this.accFire === true){
            const playerComp:Prefab_Plaryer = this.playerNode.getComponent(Prefab_Plaryer);
            const bulletNode = this.getUnUseNode();
             bulletNode.x = playerComp.getNodeX(); 
             bulletNode.y = playerComp.getNodeY();
            this.node.addChild(bulletNode);
        }
    }

    private bgMove(bgList, bgSpeed){
        for(let index = 0; index < bgList.length; index ++){
            bgList[index].y -= bgSpeed; 
        }

        if(bgList[0].y <= 20 - bgList[0].height){
            bgList[0].y = 1136;
        }

        if (bgList[1].y <= 1156 - 2 * bgList[1].height) {
            bgList[1].y = 1136;
        }
    }

    private getUnUseNode(){
        let node: cc.Node = null;
        if (this.nodePool.size() > 0) {
            node = this.nodePool.get();
        } else {
            node = cc.instantiate(this.bulletPrefab);
        }
        return node;
    }

    private nodePool: cc.NodePool = new cc.NodePool;
    private bgList: cc.Node[] = [];
    private accFire: boolean;
}