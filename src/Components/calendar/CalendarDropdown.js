import React, { useState } from "react";

import DropdownCategory from "./DropdownCategory";

function CalendarDropdown(){

  const [caretType, setCaretType] = useState(false)
  const [yearCaret, setYearCaret] = useState(false)
  const [monthCaret, setMonthCaret] = useState(false)

  return (
    <View style={{ flexDirection: 'row' }}>
      <DropdownCategory {...props} caretType={yearCaret} setCaretType={setYearCaret} categoryTitle="Year"/>
      <DropdownCategory {...props} caretType={monthCaret} setCaretType={setMonthCaret} categoryTitle="Month"/>
    </View>
  )
}

export default CalendarDropdown