import React, { Component } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import { emptyBpmn } from "../assets/empty.bpmn";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import { saveAs } from "file-saver";

class BpmnModelerComponent extends Component {
  modeler = null;

  componentDidMount = () => {
    this.modeler = new BpmnModeler({
      container: "#bpmnview",
      keyboard: {
        bindTo: window
      },
      propertiesPanel: {
        parent: "#propview"
      },
      additionalModules: [propertiesPanelModule, propertiesProviderModule],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });

    const savedDiagram = localStorage.getItem("bpmnDiagram");
    if (savedDiagram) {
      this.openBpmnDiagram(savedDiagram);
    } else {
      this.newBpmnDiagram();
    }
  };

  newBpmnDiagram = () => {
    this.openBpmnDiagram(emptyBpmn);
  };

  openBpmnDiagram = xml => {
    this.modeler.importXML(xml, error => {
      if (error) {
        return console.log("fail import xml");
      }
      var canvas = this.modeler.get("canvas");

      canvas.zoom("fit-viewport");
    });
  };

  saveBpmnDiagram = () => {
    this.modeler.saveXML({ format: true }, (err, xml) => {
      if (err) {
        return console.error("Could not save BPMN diagram", err);
      }
      localStorage.setItem("bpmnDiagram", xml); // Save the XML to local storage
      const blob = new Blob([xml], { type: "application/xml" });
      saveAs(blob, "diagram.bpmn"); // Save the file as diagram.bpmn
    });
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xml = e.target.result;
        this.openBpmnDiagram(xml); // Open the uploaded BPMN diagram
      };
      reader.readAsText(file);
    }
  };

  render = () => {
    return (
      <div id="bpmncontainer">
        <div
          id="propview"
          style={{
            width: "25%",
            height: "98vh",
            float: "right",
            maxHeight: "98vh",
            overflowX: "auto"
          }}
        ></div>
        <div
          id="bpmnview"
          style={{ width: "75%", height: "98vh", float: "left" }}
        ></div>
        <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
          <button onClick={this.saveBpmnDiagram} style={{ marginRight: "10px" }}>
            Save
          </button>
          <input
            type="file"
            accept=".bpmn"
            onChange={this.handleFileUpload}
            style={{ display: "inline-block" }}
          />
        </div>
      </div>
    );
  };
}

export default BpmnModelerComponent;
