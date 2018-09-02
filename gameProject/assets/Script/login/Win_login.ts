const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Win_login extends cc.Component {
    @property({
        type: cc.Button,
        tooltip: "登录按钮"
    })
    loginBtn: cc.Button = null;

    @property({
        type: cc.EditBox,
        tooltip: "用户名输入框"
    })
    nameEditBox: cc.EditBox = null;

    @property({
        type: cc.EditBox,
        tooltip: "密码输入框"
    })
    passwordEditBox: cc.EditBox = null;

    @property({
        type: cc.Button,
        tooltip: "退出按钮"
    })
    closeBtn: cc.Button = null;

    @property({
        type: cc.Prefab,
        tooltip: "提示框"
    })
    tipPrefab: cc.Prefab = null;

    onLoad() {
        this.Monitor();
    }

    onDisable() {
        this.unMonitor();
    }

    private Monitor() {
        this.loginBtn.node.on("click", this.onLoginBtnClicked, this);
        this.closeBtn.node.on("click", this.onCloseBtnClicked, this);
    }

    private unMonitor() {
        this.loginBtn.node.off("click", this.onLoginBtnClicked, this);
        this.closeBtn.node.off("click", this.onCloseBtnClicked, this);
    }

    private onLoginBtnClicked() {
        if(this.nameEditBox.string){
         this.name = this.nameEditBox.string 
        }
        if(this.passwordEditBox){
            this.passWord =  this.passwordEditBox.string;
        }
        cc.log(this.passWord+"dsdsa"+this.name);
        
    }


    private onCloseBtnClicked() {
        const Prefab = cc.instantiate(this.tipPrefab);
        this.node.addChild(Prefab);
    }

    public name: string;
    public passWord: string;
}