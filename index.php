<?php
$adminMode = 0;
function load_dates($fajlnev, $adat = array())
{
  $s = @file_get_contents($fajlnev);
  return $s == false
    ? $adat
    : json_decode($s, true);
}
$appointments = load_dates('dates.txt');

function save_Date($fajlnev, $adat)
{
  $s = json_encode($adat);
  file_put_contents($fajlnev, $s);
}
function validateDate($date, $format = 'Y-m-d')
{
  $d = DateTime::createFromFormat($format, $date);
  return $d && $d->format($format) === $date;
}


$hibak = array();
if ($_POST) {
  $date = trim($_POST['newDate']);
  $hour = trim($_POST['hour']);

  if ($date == '') {
    $hibak[] = 'Dátum kotelezo!';
  } else if (!validateDate($date)) {
    $hibak[] = 'Dátum formátum hibás';
  }
  if ($hour == '') {
    $hibak[] = 'Időpont kötelező!';
  } else if (!preg_match("/^(?:2[0-3]|[01][0-9]):[0-6][0-9]$/", $hour)) {
    $hibak[] = 'Időpont formátum hibás';
  }
  $currentDate = 20 . date("y-m-d");
  if ($currentDate >= $date) {
    $hibak[] = 'Múltbéli dátum, nem adható meg!';
  }
  if (!$hibak) {
    $appointments = load_dates('dates.txt');
    $size = sizeof($appointments);
    $appointments[] = array(

      'id'            => 'appid' . $size,
      'time'            => $date . " " . $hour,

    );
    save_Date('dates.txt', $appointments);
    header('Location: Succes.php');
    exit();
  }
}
session_start();
if (isset($_SESSION["user"])) : ?>
  <strong>
    <a href="LogOut.php">
      Log out (<?= $_SESSION["user"]["name"] ?>)
    </a>
  </strong>
  <?php 
  if($_SESSION["user"]["mail"] == "admin@nemkovid.hu"){
    $adminMode = 1;
  }
  ?>
<?php else : ?>
  <strong><a href="Login.php">Log in</a></strong>
<?php endif; ?>

<html lang="en">

<head>
  <style>
    #text {
      text-align: center;
    }
    body {
            font-size:20px;
            background-color: grey;
        }
  </style>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="text">
    <h1>Nemzeti Koronavírus Depó</h1>
    <br>
    <br>
    <?php
    if(!$adminMode){
      echo "<p>A Nemzeti Koronavírus Depó (NemKoViD - Mondj nemet a koronavírusra!) központi épületében különböző időpontokban oltásokat szervez.</p>";
    }
    ?>
    <br>
    <?php
    if ($adminMode) {
      echo 'Adjon hozzá új időpontot:<br><br>
      <form action="" method="post">
       Dátum
        <input type="text" id="newDate" , name="newDate" value="2021-01-01">
        <br><br>
        Időpont:
        <input type="text" id="hour" , name="hour" value="12:00">
        <br><br>
        <input type="submit" value="Hozzáad">
      </form>';
      if ($hibak) {
        print_r($hibak);
      }
      echo "<br>";
    }
    ?>
    <label for="dates">Elérhető dátumok:</label>
    <select name="dates" id="dates">
      <?php
      foreach ($appointments as $date => $d) :
        $fill = $d["time"];
        echo "<option value='$fill'>$fill</option>";
      endforeach;
      ?>
    </select>
  </div>
</body>

</html>