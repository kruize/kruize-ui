import React, { useState, useEffect, useContext } from "react";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import nodeContext from "@app/Context_store/nodeContext";

const NameSpaceDropDown = (props: { data; setData }) => {
  const [namespaces, setNamespaces] = useState([]);
  const [selected, setSelected] = useState(props.data["namespace"]);
  const [isopen, setIsopen] = useState(false);
  const Context = useContext(nodeContext);
  const ip = Context["cluster"];
  const port = Context["autotune"];
  const namespace_url = "http://" + ip + ":" + port + "/query/listNamespaces";

  useEffect(() => {
    if (ip != "undefined" && port != "undefined") {
      setSelected(sessionStorage.getItem("Namespace Value"))
      fetch(namespace_url)
        .then((res) => res.json())
        .then((res) => setNamespaces(res.data.namespaces));
    }

  }, []);

  useEffect(() => {
    props.setData({ ...{ ...props.data }, namespace: selected })
  }, [selected])

  const onSelect = (event, selection, isPlaceholder) => {
    setSelected(selection);
    setIsopen(false);
    sessionStorage.setItem("Namespace Value", selection);
    var payload = {
      namespace: selection,
    };
  };

  return (
    <>
      <Select

        variant={SelectVariant.single}
        placeholderText="Select Namespace"
        aria-label="Select Input with descriptions"
        onToggle={() => setIsopen(!isopen)}
        onSelect={onSelect}
        // onChange={onChange}
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
