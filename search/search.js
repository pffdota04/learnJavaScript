const data = [
  {
    name: "John",
    age: 32,
    job: "IT",
    gender: "Male",
  },
  {
    name: "Alex",
    age: 25,
    job: "IT",
    gender: "Male",
  },
  {
    name: "Mary",
    age: 42,
    job: "Police",
    gender: "Female",
  },
  {
    name: "Paul",
    age: 37,
    job: "Police",
    gender: "Male",
  },
  {
    name: "Ryan",
    age: 36,
    job: "Actor",
    gender: "Male",
  },
  {
    name: "Christ",
    age: 29,
    job: "Actor",
    gender: "Male",
  },
  {
    name: "Kale",
    age: 40,
    job: "Doctor",
    gender: "Female",
  },
  {
    name: "Joe",
    age: 55,
    job: "Doctor",
    gender: "Female",
  },
  {
    name: "Rey",
    age: 15,
    job: "Student",
    gender: "Male",
  },
  {
    name: "Linda",
    age: 17,
    job: "Student",
    gender: "Female",
  },
];

document.querySelector(".search").addEventListener("click", clickSearch);

function clickSearch() {
  const text = document.querySelector(".textInput").value;
  const job = document.querySelector("#job").value;
  const gender = document.querySelector(".genderCheck:checked").value;
  let result = [];
  if (job === "all" && gender === "all") {
    result = data.filter((a) => {
      return a.name.toLowerCase().includes(text.toLowerCase());
    });
  } else {
    if (gender !== "all" && job !== "all")
      result = data.filter((a) => {
        return (
          a.name.toLowerCase().includes(text.toLowerCase()) &&
          a.job === job &&
          a.gender === gender
        );
      });
    else if (gender !== "all" && job === "all")
      result = data.filter((a) => {
        return (
          a.name.toLowerCase().includes(text.toLowerCase()) &&
          a.gender === gender
        );
      });
    else if (gender === "all" && job !== "all")
      result = data.filter((a) => {
        return (
          a.name.toLowerCase().includes(text.toLowerCase()) && a.job === job
        );
      });
  }
  console.log(result);

  if (result.length === 0)
    document.querySelector(
      ".searchResult"
    ).innerHTML = `<h1>Không tìm thấy</h1>`;
  else {
    let table = `
    <table>
        <thead>
            <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Job</th>
            </tr>
        </thead>
    <tbody>`;

    const purchases = result
      .map(
        (e, i) =>
          `<tr class="search-item">
            <td class="name">${i}</td> 
            <td class="name">${e.name} </td> 
            <td class="gender">${e.gender} </td> 
            <td class="age">${e.age}</td> 
            <td class="job">${e.job}</td> 
        </tr>`
      )
      .join("");

    document.querySelector(".searchResult").innerHTML =
      table + purchases + " </tbody></table>";
  }
}
