window.onclick = function (event) {
    const modal = document.getElementById('modal');
    const editCategoryModal = document.getElementById('edit-category-modal');
    
    if (event.target === modal) {
        closeModal();
    } else if (event.target === editCategoryModal) {
        closedropModal();
    }
}
