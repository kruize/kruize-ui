import React, { useState, useEffect } from "react";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";

const NameSpaceDropDown = (props: { ns; nsModifier }) => {
  const [namespaces, setNamespaces] = useState([]);

  const [selected, setSelected] = useState(props.ns);
  const [isopen, setIsopen] = useState(false);
  useEffect(() => {
    // The Autotune ip and port is user specific, needs to be fetched from Autotune running in the background
    fetch("http://192.168.49.2:30232/ui/getNamespaces")
      .then((res) => res.json())
      .then((res) => setNamespaces(res.data.namespaces));
  }, []);

  const onSelect = (event, selection, isPlaceholder) => {
    setSelected(selection);
    setIsopen(false);
    console.log("selected:", selection);
    var payload = {
      namespace: selection,
    };
  };
  return (
    <Select
      variant={SelectVariant.single}
      placeholderText="Select Namespace"
      aria-label="Select Input with descriptions"
      onToggle={() => setIsopen(!isopen)}
      onSelect={onSelect}
      selections={selected}
      isOpen={isopen}
    >
      {namespaces.map((option, index) => (
        <SelectOption key={index} value={option} />
      ))}
    </Select>
  );
};

export default NameSpaceDropDown;
