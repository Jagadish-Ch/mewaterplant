import { createContext, useCallback, useEffect, useRef, useState } from "react";

export const calcDayDiff = (existedDateTime) => {
  const now = new Date();
  const itemDate = new Date(existedDateTime);
  const diffTime = now - itemDate;
  const dayDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return dayDiff;
};

const userData = [
  {
    "_id": "b1e45e3e1a6f45619c0d4293f4d2ad9b",
    "CanNo": ["4", "7", "12", "19", "23", "25"],
    "ReturnedCanNo": ["4", "7", "12", "19", "23", "25"],
    "DateTime": ["Thu May 08 2025 11:20:00 GMT+0530 (India Standard Time)"],
    "WaterType": "Drinking",
    "Name": "Ramesh",
    "MobileNo": "9123456789",
    "TotalCans": 6,
    "ReturnedCans": 6,
    "Address": "street-1",
    "EachCanAmount": 35,
    "Amount": 210,
    "PaidOrNot": "Amount Paid"
  },
  {
    "_id": "c2a74ef231f74841a8f1a3e5b53b5ac0",
    "CanNo": ["2", "3", "10", "14", "18", "21", "24"],
    "ReturnedCanNo": ["2", "3", "14", "21"],
    "DateTime": ["Tue May 13 2025 14:02:17 GMT+0530 (India Standard Time)"],
    "WaterType": "Cooling",
    "Name": "Anil",
    "MobileNo": "9876543210",
    "TotalCans": 7,
    "ReturnedCans": 4,
    "Address": "main road",
    "EachCanAmount": 35,
    "Amount": 0,
    "PaidOrNot": "Amount Not Paid"
  },
  {
    "_id": "6f8e9fcbb4974b5e8a11b409ae6ad83e",
    "CanNo": ["1", "3", "6", "8", "11"],
    "ReturnedCanNo": ["1", "3", "6", "8", "11"],
    "DateTime": ["Mon May 19 2025 09:45:32 GMT+0530 (India Standard Time)"],
    "WaterType": "Drinking",
    "Name": "Kiran",
    "MobileNo": "9988776655",
    "TotalCans": 5,
    "ReturnedCans": 5,
    "Address": "cross road",
    "EachCanAmount": 35,
    "Amount": 0,
    "PaidOrNot": "Amount Not Paid"
  },
  {
    "_id": "d93488ff639f449db715e017a607e2ef",
    "CanNo": ["5", "7", "9", "12", "15", "17", "20"],
    "ReturnedCanNo": ["7", "9", "12", "15"],
    "DateTime": ["Wed May 21 2025 17:30:44 GMT+0530 (India Standard Time)"],
    "WaterType": "Cooling",
    "Name": "Suresh",
    "MobileNo": "9112233445",
    "TotalCans": 7,
    "ReturnedCans": 4,
    "Address": "street-2",
    "EachCanAmount": 35,
    "Amount": 0,
    "PaidOrNot": "Amount Not Paid"
  },
  {
    "_id": "e07dfcd86efc43258d810fc315fd8837",
    "CanNo": ["6", "10", "13", "16", "18", "22", "24", "25"],
    "ReturnedCanNo": ["10", "13", "16", "24"],
    "DateTime": ["Fri May 23 2025 19:15:21 GMT+0530 (India Standard Time)"],
    "WaterType": "Drinking",
    "Name": "Sunil",
    "MobileNo": "9223344556",
    "TotalCans": 8,
    "ReturnedCans": 4,
    "Address": "lane-5",
    "EachCanAmount": 35,
    "Amount": 0,
    "PaidOrNot": "Amount Not Paid"
  }
];


async function searchByCanNoAndSort(canNo) {

  const targetCanNo = canNo.toString()
  // 1. Search All data from backend
  const data = userData;
  // 2. Filter: Keep only items where CanNo array includes targetCanNo
  const filtered = data.filter(item => item.CanNo.includes(targetCanNo));
  console.log("canNo-",canNo,"Filtered data: ",filtered)

  // 3. Sort: From present to past using DateTime[0]
  const sorted = filtered.sort((a, b) => {
    const dateA = new Date(a.DateTime[0]);
    const dateB = new Date(b.DateTime[0]);
    return dateB - dateA;
  });

  return sorted;
}


export const ActiveCansContext = createContext();
export const ActiveContextProvider = ({ children }) => {
  const [totalItems, setTotalItems] = useState(25);
  const [targetItemNo, setTargetItemNo] = useState(1);
  const [itemsDataWithIndicators, setItemsDataWithIndicators] = useState([]);
  const containerRef = useRef();
  const indicatorsRef = useRef();

  const extractData = async ({status, day, canNo}) => {
  const todayStatuses = ["today", "verified", "home"];
  const badgeClass = todayStatuses.includes(status) ? "show-badge" : "";

  if (status === "pending") return { canNo, status: "pending", class: "" };
  if (status === "missing") return { canNo, status: "missing", class: "show" };
  if (day === 0) return { canNo, status: "today", class: "show-badge" };
  if (day >= 1 && day <= 6) return { canNo, status: `day-${day}`, class: "" };
  if (day >= 7 && day <= 15) return { canNo, status: "pending", class: "" };
  if (day >= 16) return { canNo, status: "missing", class: "show" };

  return { canNo, status: status === "" ? "home" : status, class: badgeClass };
};


  const handleColorAllocator = async (index, status, day) => {
    const result = await extractData({status, canNo: targetItemNo})
    console.log("Updated Result: ", result)
    itemsDataWithIndicators[targetItemNo-1] = result
    console.log(containerRef);
    if (!containerRef.current.children[index]) {
      return;
    }
    const ele = containerRef.current.children[index];
    console.log(ele);
    const eleClass = ele.classList;

    const allocateColor = (color) => {

      const index = {
        'verified' : 0,
        'missing' : 1,
        'home' : 2,
        '' : 2,
        'today' : 3,
      }

      if (eleClass.length == 2) {
        if (eleClass[1] === "missing") {
          ele.children[1].classList.remove("show");
        } else if (["verified", "home", "today"].includes(eleClass[1])) {
          console.log(ele.children)
          ele.children[index[eleClass[1]]].classList.remove("show-badge");
        }
        eleClass.replace(eleClass[1], color);
      } else {
        eleClass.toggle(color);
      }
    };

    // send data to backed about manual events verified, pending, missing.
    console.log(itemsDataWithIndicators[targetItemNo-1])

    if (status === "verified") {
      // send data to backed about this
      allocateColor("verified");
      ele.children[0].classList.toggle("show-badge");
      
    } else if (status === "pending") {
      // send data to backed about this
      allocateColor("pending");
      
    } else if (status === "missing") {
      // send data to backed about this
      allocateColor("missing");
      ele.children[1].classList.toggle("show");
      
    } else if (day === 0) {
      allocateColor("today");
      ele.children[3].classList.toggle("show-badge");
      
    } else if (day === 1) {
      allocateColor("day-1");
      
    } else if (day === 2) {
      allocateColor("day-2");
      
    } else if (day === 3) {
      allocateColor("day-3");
      
    } else if (day === 4) {
      allocateColor("day-4");
      
    } else if (day === 5) {
      allocateColor("day-5");
      
    } else if (day === 6) {
      allocateColor("day-6");
      
    } else if (day >= 7 && day <= 15) {
      allocateColor("pending");
      
    } else if (day >= 16) {
      allocateColor("missing");
      ele.children[1].classList.toggle("show");
      
    } else {
      allocateColor("home");
      ele.children[2].classList.toggle("show-badge");
      
    }
  };

  const analyzeItemsWithRespectiveIndicators = async (canNo, sortedData, manualItem) => {
    const params = {
      canNo,
    }
  if (!sortedData.length) return await extractData({...params, status: manualItem.status });

  const userEntry = sortedData[0];
  const manualDate = new Date(manualItem.dateTime);
  const userDate = new Date(userEntry.DateTime[0]);

  if (manualItem.status === "") {
    return await extractData({...params, status: "home" });
  }

  const isFullyReturned = userEntry.TotalCans === userEntry.ReturnedCans;

  if (isFullyReturned) {
    return userDate >= manualDate
      ? await extractData({...params, status: "home" })
      : await extractData({...params, status: manualItem.status });
  }

  if (userDate.getTime() === manualDate.getTime()) {
    return await extractData({...params, status: "today" });
  }

  if (userDate > manualDate) {
    return await extractData({...params, status: "",  day: calcDayDiff(userDate)});
  }

  return await extractData({...params, status: "",  day: calcDayDiff(manualDate)});
};

  const indicatorsConfig = [
    {
      name: "all",
      htmlElements: (
        <>
          <p>All</p>
          <span className="show-badge">
            <p>
              <i className="bxr bx-home-alt" />
            </p>
          </span>
        </>
      ),
    },
    {
      name: "home",
      htmlElements: (
        <>
          <p>H</p>
          <span className="show-badge">
            <p>
              <i className="bxr bx-home-alt" />
            </p>
          </span>
        </>
      ),
    },
    {
      name: "today",
      htmlElements: (
        <>
          <p>T</p>
          <span className="show-badge">
            <p>
              <i className=""></i>
            </p>
          </span>
        </>
      ),
    },
    {
      name: "day-1",
      htmlElements: (
        <>
          <p>Day</p>
          <p>1</p>
        </>
      ),
    },
    {
      name: "day-2",
      htmlElements: (
        <>
          {" "}
          <p>Day</p>
          <p>2</p>
        </>
      ),
    },
    {
      name: "day-3",
      htmlElements: (
        <>
          <p>Day</p>
          <p>3</p>
        </>
      ),
    },
    {
      name: "day-4",
      htmlElements: (
        <>
          <p>Day</p>
          <p>4</p>
        </>
      ),
    },
    {
      name: "day-5",
      htmlElements: (
        <>
          <p>Day</p>
          <p>5</p>
        </>
      ),
    },
    {
      name: "day-6",
      htmlElements: (
        <>
          <p>Day</p>
          <p>6</p>
        </>
      ),
    },
    {
      name: "pending",
      htmlElements: (
        <>
          {" "}
          <p>P</p>
          <p></p>
        </>
      ),
    },
    {
      name: "missing",
      htmlElements: (
        <>
          <p>M</p>
          <span className="show">
            <p>X</p>
          </span>
        </>
      ),
    },
    {
      name: "verified",
      htmlElements: (
        <>
          <p>V</p>
          <span className="show-badge">
            <p>
              <i className="bxr bx-badge-check"></i>
            </p>
          </span>
        </>
      ),
    },
  ];

  const manualData = [
      {
        dateTime: "Tue May 20 2025 08:15:24 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Wed May 21 2025 22:33:45 GMT+0530 (India Standard Time)",
        status: "",
      },
      {
        dateTime: "Thu May 22 2025 13:07:59 GMT+0530 (India Standard Time)",
        status: "today",
      },
      {
        dateTime: "Fri May 23 2025 06:42:11 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Sat May 24 2025 15:19:37 GMT+0530 (India Standard Time)",
        status: "missing",
      },
      {
        dateTime: "Sun May 25 2025 19:55:03 GMT+0530 (India Standard Time)",
        status: "pending",
      },
      {
        dateTime: "Mon May 26 2025 04:28:36 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Tue May 27 2025 12:12:58 GMT+0530 (India Standard Time)",
        status: "missing",
      },
      {
        dateTime: "Wed May 28 2025 21:04:22 GMT+0530 (India Standard Time)",
        status: "pending",
      },
      {
        dateTime: "Thu May 29 2025 09:48:10 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Fri May 30 2025 17:35:49 GMT+0530 (India Standard Time)",
        status: "missing",
      },
      {
        dateTime: "Sat May 31 2025 23:26:17 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Sun Jun 01 2025 05:41:32 GMT+0530 (India Standard Time)",
        status: "pending",
      },
      {
        dateTime: "Mon Jun 02 2025 18:29:05 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Tue Jun 03 2025 10:13:39 GMT+0530 (India Standard Time)",
        status: "missing",
      },
      {
        dateTime: "Wed Jun 04 2025 01:50:44 GMT+0530 (India Standard Time)",
        status: "pending",
      },
      {
        dateTime: "Thu Jun 05 2025 14:06:28 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Fri Jun 06 2025 07:23:55 GMT+0530 (India Standard Time)",
        status: "pending",
      },
      {
        dateTime: "Sat Jun 07 2025 16:39:13 GMT+0530 (India Standard Time)",
        status: "missing",
      },
      {
        dateTime: "Sun Jun 08 2025 20:58:01 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Mon Jun 09 2025 11:11:07 GMT+0530 (India Standard Time)",
        status: "pending",
      },
      {
        dateTime: "Tue May 20 2025 23:59:59 GMT+0530 (India Standard Time)",
        status: "missing",
      },
      {
        dateTime: "Thu May 22 2025 00:00:01 GMT+0530 (India Standard Time)",
        status: "verified",
      },
      {
        dateTime: "Fri May 30 2025 14:17:33 GMT+0530 (India Standard Time)",
        status: "pending",
      },
      {
        dateTime: "Fri Jun 06 2025 03:03:03 GMT+0530 (India Standard Time)",
        status: "missing",
      },
  ];

  const finalizeIndicators = async () => {
  const indicators = [];

  for (let i = 0; i < manualData.length; i++) {
    const canNo = i + 1;
    const sortedUserData = await searchByCanNoAndSort(canNo);
    const indicator = await analyzeItemsWithRespectiveIndicators(canNo, sortedUserData, manualData[i]);
    indicators.push(indicator);
  }

  return indicators;
};

  const containerConfig = async (role = "guest") => {
    if (role === "guest") return Array(90).fill({ status: "" });

    const result =  await finalizeIndicators()
    console.log(result)
    return result.length? result :manualData;
  };

  useEffect(() => {
  

  const getData = async () => {
    try {
      const data = await containerConfig("");
      setItemsDataWithIndicators(data);
    } catch (err) {
      console.error(err);
    }
  };

  getData();

  return () => {
     
  };
}, []);

  const value = {
    indicatorsRef,
    containerRef,
    totalItems,
    setTotalItems,
    targetItemNo,
    setTargetItemNo,
    handleColorAllocator,
    indicatorsConfig,
    containerConfig,
    itemsDataWithIndicators,
    setItemsDataWithIndicators,
  };

  return (
    <ActiveCansContext.Provider value={value}>
      {children}
    </ActiveCansContext.Provider>
  );
};
