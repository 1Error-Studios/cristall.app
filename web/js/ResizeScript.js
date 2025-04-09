const resizeData = {
    tracking: false,
    startWidth: null,
    startCursorScreenX: null,
    handleWidth: 10,
    resizeTarget: null,
    parentElement: null,
    maxWidth: null,
};
  
$(document.body).on('mousedown', '.sidebar-resizer', null, (event) => {
    if (event.button !== 0) {
        return;
    }
  
    event.preventDefault();
    event.stopPropagation();
  
    const handleElement = event.currentTarget;
    
    const targetSelector = handleElement.getAttribute('data-target');
    const targetElement = document.querySelector(targetSelector);
    
    resizeData.startWidth = $(targetElement).outerWidth();
    resizeData.startCursorScreenX = event.screenX;
    resizeData.resizeTarget = targetElement;
    resizeData.parentElement = handleElement.parentElement;
    resizeData.maxWidth = 320;
    resizeData.tracking = true;
});
  
$(window).on('mousemove', null, null, _.debounce((event) => {
    if (resizeData.tracking) {
        const cursorScreenXDelta = event.screenX - resizeData.startCursorScreenX;
        const newWidth = Math.min(resizeData.startWidth + cursorScreenXDelta, resizeData.maxWidth);
        
        $(resizeData.resizeTarget).outerWidth(newWidth);
    }
}, 1));
  
$(window).on('mouseup', null, null, (event) => {
    if (resizeData.tracking) {
        resizeData.tracking = false;
    }
});