$(function() {
    $('.am-topbar-btn').on('click', function() {
        $('.am-collapse').toggle()
    })
})






if ($('.cat-menu')) {
    $('.cat-menu').html('<li class="cat-menu-item components"><a href="components.html" class="cat-menu-item-link">使用 Amaze UI Color</a></li><li class="cat-menu-item"><a href="javascript:;" class="cat-menu-item-link cat-menu-sub-title cat-menu-sub-open"><span>Form</span><span class="cat-chinese">表单</span><span class="cat-form-form-ico cat-menu-sub-title-right-ico am-fr am-icon-angle-down am-margin-right-lg"></span></a><ul class="cat-menu-sub cat-menu-sub-form"><li class="cat-menu-item cat-menu-item-group-title">Form Controls</li><li class="cat-menu-item form-input"><a href="form-input.html" class="cat-menu-item-link"><span>Input</span><span class="cat-chinese">输入框</span></a></li><li class="cat-menu-item form-radio"><a href="form-radio.html" class="cat-menu-item-link"><span>Radio</span><span class="cat-chinese">单选框</span></a></li><li class="cat-menu-item form-checkbox"><a href="form-checkbox.html" class="cat-menu-item-link"><span>Checkbox</span><span class="cat-chinese">多选框</span></a></li><li class="cat-menu-item form-switch"><a href="form-switch.html" class="cat-menu-item-link"><span>Switch</span><span class="cat-chinese">开关</span></a></li><li class="cat-menu-item form-datepicker"><a href="form-datepicker.html" class="cat-menu-item-link"><span>DatePicker</span><span class="cat-chinese">时间选择框</span></a></li><li class="cat-menu-item form-city-select"><a href="form-city-select.html" class="cat-menu-item-link"><span>CitySelect</span><span class="cat-chinese">城市选择框</span></a></li><li class="cat-menu-item form-auto-complete"><a href="form-auto-complete.html" class="cat-menu-item-link"><span>AutoComplete</span><span class="cat-chinese">自动完成</span></a></li><li class="cat-menu-item form-upload"><a href="form-upload.html" class="cat-menu-item-link"><span>Upload</span><span class="cat-chinese">图片上传</span></a></li><li class="cat-menu-item form-word-count"><a href="form-word-count.html" class="cat-menu-item-link"><span>WordCount</span><span class="cat-chinese">文字统计</span></a></li><li class="cat-menu-item form-page"><a href="form-page.html" class="cat-menu-item-link"><span>FormPage</span><span class="cat-chinese">表单示例</span></a></li></ul></li><li class="cat-menu-item table"><a href="table.html" class="cat-menu-item-link"><span>Table</span><span class="cat-chinese">表格</span></a></li><li class="cat-menu-item modal"><a href="modal.html" class="cat-menu-item-link"><span>Modal</span><span class="cat-chinese">模态窗口</span></a></li><li class="cat-menu-item filtrate"><a href="filtrate.html" class="cat-menu-item-link"><span>Filtrate</span><span class="cat-chinese">分类筛选</span></a></li><li class="cat-menu-item collapse"><a href="collapse.html" class="cat-menu-item-link"><span>Collapse</span><span class="cat-chinese">折叠面板</span></a></li><li class="cat-menu-item card"><a href="card.html" class="cat-menu-item-link"><span>Card</span><span class="cat-chinese">卡片</span></a></li><li class="cat-menu-item popover"><a href="popover.html" class="cat-menu-item-link"><span>Popover</span><span class="cat-chinese">气泡</span></a></li><li class="cat-menu-item progress"><a href="progress.html" class="cat-menu-item-link"><span>Progress</span><span class="cat-chinese">进度条</span></a></li><li class="cat-menu-item slider"><a href="slider.html" class="cat-menu-item-link"><span>Slider</span><span class="cat-chinese">滑动输入条</span></a></li><li class="cat-menu-item timeline"><a href="timeline.html" class="cat-menu-item-link"><span>Timeline</span><span class="cat-chinese">时间轴</span></a></li><li class="cat-menu-item step"><a href="step.html" class="cat-menu-item-link"><span>Step</span><span class="cat-chinese">步骤条</span></a></li><li class="cat-menu-item breadcrumb"><a href="breadcrumb.html" class="cat-menu-item-link"><span>Breadcrumb</span><span class="cat-chinese">面包屑</span></a></li>');


    var PageTypeTag = $('body').attr('data-type');
    $('.' + PageTypeTag).addClass('active');
    if (PageTypeTag == 'form-input' || PageTypeTag == 'form-radio' || PageTypeTag == 'form-checkbox' || PageTypeTag == 'form-switch' || PageTypeTag == 'form-datepicker' || PageTypeTag == 'form-city-select' || PageTypeTag == 'form-auto-complete' || PageTypeTag == 'form-upload' || PageTypeTag == 'form-word-count' || PageTypeTag == 'form-page') {
        $('.cat-form-form-ico').addClass('cat-rotate');
        $('.cat-menu-sub-form').show();
    }
    $('.cat-menu-sub-title').on('click', function() {
        $(this).siblings('.cat-menu-sub').slideToggle(300)
            .end()
            .find('.cat-menu-sub-title-right-ico').toggleClass('cat-rotate');
    })


}