const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Win_login extends cc.Component {
    @property({
        type: cc.Button,
        tooltip: "登录按钮"
    })
    loginBtn: cc.Button = null;

    @property({
        type: cc.Button,
        tooltip: "退出按钮"
    })
    closeBtn: cc.Button = null;

    onEnable() {
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
        cc.log(111111);
    }

    private onCloseBtnClicked() {
        cc.log(22222);
    }
}