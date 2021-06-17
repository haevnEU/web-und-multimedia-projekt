<!DOCTYPE html>
<html>
<head>
<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table, td, th {
  border: 1px solid black;
  padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$q = $_GET['q'];
echo $q;
$con = mysqli_connect('localhost','register','1234','game');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
if($q === "@tetris.de"){
    $sql="SELECT * FROM player WHERE email like '%".$q."'";
}else{
    $sql="SELECT * FROM player WHERE email = '".$q."'";
}
echo $sql;
$result = mysqli_query($con,$sql);

echo "<table>
<tr>
<th>User ID</th>
<th>Firstname</th>
<th>Lastname</th>
<th>Mail</th>
<th>state</th>
<th>motto</th>
<th>gametag</th>
<th>score</th>
<th>pass</th>
</tr>";
while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td>" . $row['USER_ID'] . "</td>";
  echo "<td>" . $row['first_name'] . "</td>";
  echo "<td>" . $row['surname'] . "</td>";
  echo "<td>" . $row['email'] . "</td>";
  echo "<td>" . $row['state'] . "</td>";
  echo "<td>" . $row['motto'] . "</td>";
  echo "<td>" . $row['gametag'] . "</td>";
  echo "<td>" . $row['score'] . "</td>";
  echo "<td>" . $row['pass'] . "</td>";
  echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>
</body>
</html>