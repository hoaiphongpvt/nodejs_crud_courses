const btnDeletes = document.getElementsByClassName('btnDelete')
const modalDelete = document.getElementById('delete-course-modal')
const btnCancel = document.getElementById('btnCancel')
const idCourse = document.getElementById('idCourse')

for (let i = 0; i < btnDeletes.length; i++) {
    btnDeletes[i].addEventListener('click', function () {
        modalDelete.style.display = 'block'
        idCourse.setAttribute('value', this.getAttribute('data-id'))
    })
}
btnCancel.addEventListener('click', function () {
    modalDelete.style.display = 'none'
})
