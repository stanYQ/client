import { uiPalnceGame } from "./Win_planeGame";

const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Win_GameOver extends cc.Component { 
    @property({
        type: cc.Label,
        tooltip:"历史最大成绩的数值"
    })
    scoreMax: cc.Label = null;

    @property({
        type: cc.Label,
        tooltip: "本局获取的成绩"
    })
    scoreNum: cc.Label = null;

    onLoad(){
    }

    initWithData(score: number){
        this.scoreNum.string = score.toString();
        // // this.maxList.push(score);
        // this.scoreNum.string = score.toString();
        // let max:number = 0;
        // if(this.maxList.length > 0){
        //     for(let i = 0; i < this.maxList.length; i++){
        //         if(this.maxList[i] > max){
        //             max = this.maxList[i]
        //         }
        //     }
        // }else{
        //     this.scoreMax.string = score.toString();
        // }
    }

    private maxList: number[];
}