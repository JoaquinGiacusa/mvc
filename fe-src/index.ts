import { Dropzone } from "dropzone";

async function pullProfile() {
  const form = document.querySelector(".form");
  const img = document.querySelector(".profile-picture");
  const res = await fetch("http://localhost:3005" + "/profile");
  const data = await res.json();

  if (data) {
    form["fullname"].value = data.fullName;
    form["bio"].value = data.bio;
    img["src"] = data.pictureURL;
  }
  console.log(data);
}

(function () {
  pullProfile();
  const form = document.querySelector(".form");
  let imagaDataURL;
  // la url la exige la librería
  const myDropzone = new Dropzone(".profile-picture-container", {
    url: "/falsa",
    autoProcessQueue: false,
  });

  myDropzone.on("thumbnail", function (file) {
    imagaDataURL = file.dataURL;
    // usando este evento pueden acceder al dataURL directamente
    //console.log(file.dataURL);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;
    const fullName = target.fullname.value;
    const bio = target.bio.value;

    fetch("http://localhost:3005" + "/profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fullName,
        bio,
        imagaDataURL,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
      });
  });
})();
