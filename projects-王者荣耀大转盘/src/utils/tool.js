const tool = {
    /**鼠标点击延迟，name：节点的类名，delay:延迟时间（ms） */
    clickDelay: (name, delay = 2000) => {
        let nodeArr;
        nodeArr = document.getElementsByClassName(name);
        if (!nodeArr || nodeArr.length <= 0) { console.warn("鼠标点击延迟添加失败，节点不存在！！！！请查看----->"); return; }
        for (let i = 0; i < nodeArr.length; i++) {
            let node = nodeArr[i];
            node.style.pointerEvents = 'none'
            setTimeout(() => {
                if (node)
                    node.style.pointerEvents = ''
            }, delay)
        }
    },
}
export default tool