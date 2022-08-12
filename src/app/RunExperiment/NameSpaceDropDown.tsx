import React, { useState, useEffect, useContext } from "react";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import nodeContext from "@app/Context_store/nodeContext";

const NameSpaceDropDown = (props: { ns; nsModifier }) => {
  const [namespaces, setNamespaces] = useState([]);
  const [selected, setSelected] = useState(props.ns);
  const [isopen, setIsopen] = useState(false);
  const Context = useContext(nodeContext);
  const ip = Context["cluster"];
  const port = Context["autotune"];
  const namespace_url = "http://" + ip  + ":" + port + "/ui/getNamespaces";

  useEffect(() => {
    fetch(namespace_url)
      .then((res) => res.json())
      .then((res) => setNamespaces(res.data.namespaces));
      
  }, []);

  const onSelect = (event, selection, isPlaceholder) => {
    setSelected(selection);
    setIsopen(false);
    console.log("selected:", selection);
    sessionStorage.setItem("Namespace Value", selection);
    var payload = {
      namespace: selection,
    };
  };
    useEffect(() => {
    setSelected(sessionStorage.getItem("Namespace Value"))

    },[]);
    
  
  return (
    <>
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
    
    </>
  );
};

export default NameSpaceDropDown;
