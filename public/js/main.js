const deleteButton = document.querySelectorAll(".fa-trash");

Array.from(deleteButton).forEach((element) => {
  element.addEventListener("click", deletePhoto);
});

async function deletePhoto() {
  const id = "62a0cbf99bb5561cab9b07c3";

  try {
    const res = await fetch("deletePhoto", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
