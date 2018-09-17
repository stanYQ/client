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

    onLoad(){
        this.bgList[0] = this.bg1;
        this.bgList[1] = this.bg2;
    }
    
    update(dt){
        this.bgMove(this.bgList, this.bgSpeed);
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
    private bgList: cc.Node[] = [];
}