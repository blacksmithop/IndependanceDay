
$(".btn").click(function () {
  let username = $(".form-control").val();
  let platform = $(this).attr("value");
  if (username != "") getPlayerDetails(username, platform);
});

async function getPlayerDetails(username, platform) {
  let URL = `https://shielded-escarpment-36078.herokuapp.com/${username}/${platform}`;
  await axios
    .get(URL)
    .then(function (response) {
      // handle success
      console.log(`Status: ${response.status}`);
      let data = response.data.content;
    })
    if (!("error" in data)) {
      $(".alert").css("display", "none");
      $(".stat-box").css("display", "none");
      fillPlayerCard(data.global);
    } else {
      $("strong").text(data.error);
      $(".alert").css("display", "inline-block");
      $(".stat-box").css("display", "none");
    }
    if (data.status == 404){
      $("strong").text(data.error);
      $(".stat-box").css("display", "none");
      $(".alert").css("display", "inline-block");
    }
     
}

function fillPlayerCard(data) {
  console.log("Populating player card");
  let hasAvatar = data.avatar == "Not available" || data.avatar == null;
  let src = hasAvatar
    ? "https://i.ibb.co/5R71tmb/placeholderapex.png"
    : data.avatar;
  $("img").attr("src", src);

  $(".name").html(data.name);
  $(".level").html(data.level);
  $(".progress-bar").width(`${data.toNextLevelPercent}%`);
  $(".progress-bar").attr("aria-valuenow", data.toNextLevelPercent);

  $(".stat-box").css("display", "block");
}

$(".btn-close").click(function () {
  $(".alert").fadeOut("slow");
});