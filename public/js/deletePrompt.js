/* script para confirmar si usaurio quiere eliminar su perfil */

let deleteForm = document.querySelector('#deleteForm')
deleteForm.addEventListener('click', function (e) {
    e.preventDefault();
        swal({
            title: "Estas seguro de borrar tu Perfil?",
            text: "Una vez eliminado, perderás todos tus datos y actividades ya abonadas!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
    })
    .then(
        (willDelete) => {
        if (willDelete) {
            $('#deleteForm').trigger('click', {});
        } else {
            swal("Todavía estás inscripto con nosotros.", {icon: "success"});
        }
    });
});