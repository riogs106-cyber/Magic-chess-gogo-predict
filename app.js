async function addMatch() {
  const id = document.getElementById("opponent_id").value.trim();
  const name = document.getElementById("opponent_name").value.trim();
  if (!id) return alert("Masukkan opponent ID");
  const res = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ opponent_id: id, opponent_name: name })
  });
  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}

async function predict() {
  const res = await fetch("/api/predict");
  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}