module.exports = {
    showDesign: function (object_name, record_id) {
        const rootId = `steedosChartDesignModalRoot`;
        let modalRoot = document.getElementById(rootId);
        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.setAttribute('id', rootId);
            document.body.appendChild(modalRoot)
        }
        SteedosUI.render(stores.ComponentRegistry.components.ChartDesignModal, { chartId: record_id }, $(`#${rootId}`)[0]);
        setTimeout(()=>{
            let triggerDom = document.querySelector(`#${rootId} #chartDesignModalBtn`);
            triggerDom && triggerDom.click();
          }, 500);
    },
    showDesignVisible: function () {
        return true
    }
}