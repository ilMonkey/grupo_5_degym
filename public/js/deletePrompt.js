/* script para confirmar si usaurio quiere eliminar su perfil */

let deleteForm = document.querySelector('#deleteForm')
deleteForm.addEventListener('submit', function (e) {
    e.preventDefault();
        swal({
            title: "Estas seguro de borrar tu Perfil?",
            text: "Una vez eliminado, perderás todos tus datos y actividades ya abonadas!",
            icon: "warning",
            buttons: {
                        confirm: true
            },
            dangerMode: true,
    })
    .then(
        (value) => {
        if (value) {
                e.target.submit()
            } else {
            swal("Todavía estás inscripto con nosotros.", {icon: "success"});
        }
    });
});