/* 
 * 基于 prototype 的 ul 鼠标移入/移出/选择 li 的 一个封装类
 */
var ULSelected = Class.create({
    initialize: function(ul,option){
        this.init_attrs(ul,option);
        
        this.init_mouseover();
        this.init_mouseout();
        this.init_click();
    },
    init_attrs: function(ul,option){
        this.ul = ul;
        this.option = option;
        this.lis = ul.childElements();
        this.ul_children = ul.select(".");
    },
    /**
     * 初始化鼠标移入事件
     * 鼠标移入 ele
     * 当 ele 的 祖先节点 中有 li，并且 li 属于 ul 时，
     * 给 li 增加 mouseover class
     */
    init_mouseover: function(){
        this.ul.observe("mouseover",function(evt){
            var ele = evt.element();
            //            var fele = evt.relatedTarget;
            var li = this.get_li_in_ul(ele);
            if(li){
                li.addClassName("mouseover")
            }
        }.bind(this));
    },
    /*
     * 初始化鼠标移出事件
     * 鼠标移出 ele，进入 toElement
     * 当 ele 和 toElement 不是一个 li 的子节点时
     * 给 li 去除 mouseover class
     **/
    init_mouseout: function(){
        this.ul.observe("mouseout",function(evt){
            var ele = evt.element();
            var tele = evt.relatedTarget;
            var li = this.get_li_in_ul(ele);
            var tele_li = this.get_li_in_ul(tele);
            if(li && li !== tele_li){
                li.removeClassName("mouseover");
            }
        }.bind(this));
    },
    init_click: function(){
        this.ul.observe("click",function(evt){
            var ele = evt.element();
            var li = this.get_li_in_ul(ele);
            if(li){
                if(this.selected_li){this.selected_li.removeClassName("selected")}
                li.addClassName("selected");
                this.selected_li = li;
            }
        }.bind(this));
    },
    /*
     * 从 ele 和 ele 的祖先节点中,找到属于 ul 的 li
     **/
    get_li_in_ul: function(ele){
        // 如果 ele 是空，返回空
        if(!ele){
            return null
            }
        // 如果 ele 不是 ul 的子元素，返回空
        if(!this.ul_children.include(ele)){
            return null
            }
        // 如果 ele 自己是 li，返回 ele
        if(ele.tagName === "li"){
            return ele
            }
        // 如果 ele 的 祖先节点 li 是 lis 里的，则 返回这个祖先节点
        var li = ele.up("li");
        if(li && this.lis.include(li)){
            return li
            }
        return null;
    }
});