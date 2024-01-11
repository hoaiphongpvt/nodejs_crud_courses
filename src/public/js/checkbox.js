document.addEventListener('DOMContentLoaded', function () {
    const checkboxAll = $('#selectAll')
    const checkboxItems = $('.checkbox-item')
    const btnApply = $('#btnApply')

    checkboxAll.change(function () {
        const isCheckedAll = $(this).prop('checked')
        checkboxItems.prop('checked', isCheckedAll)
        renderBtnApply()
    })

    checkboxItems.change(function () {
        const countIsChecked =
            checkboxItems.length === checkboxItems.filter(':checked').length

        checkboxAll.prop('checked', countIsChecked)
        renderBtnApply()
    })

    function renderBtnApply() {
        const countIsChecked = checkboxItems.filter(':checked').length
        if (countIsChecked > 0) {
            btnApply.removeClass('disabled')
        } else {
            btnApply.addClass('disabled', 'disabled')
        }
    }
})
