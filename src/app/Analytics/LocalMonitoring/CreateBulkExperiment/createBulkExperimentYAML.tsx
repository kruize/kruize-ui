export default `{
  "filter": {
    "exclude": {
      "namespace": [],
      "workload": [],
      "containers": [],
      "labels": {}
    },
    "include": {
      "namespace": [],
      "workload": [],
      "containers": [],
      "labels": {
        "key1": "value1",
        "key2": "value2"
      }
    }
  },
  "time_range": {
    "start": "2024-11-01T00:00:00.000Z",
    "end": "2024-11-15T23:59:59.000Z"
  },
  "datasource": "subsitute_datasource_name",
  "webhook": {
    "url" : "http://127.0.0.1:8080/webhook"
  }
}`;