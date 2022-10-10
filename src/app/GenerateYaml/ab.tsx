export default `apiVersion: "recommender.com/v1"
kind: Autotune
metadata:
  name: "experiment_name"
  namespace: "namespace_name"
spec:
  slo:
    objective_function: "net_equation"
    slo_class: "throughput"
    direction: "maximize"
    hpo_algo_impl: "optuna_tpe"
    function_variables:
    - name: "variable1_name"
      query: "variable1_query"
      datasource: "variable1_datasource" 
      value_type: "variable1_value_type"
    - name: "variable2_name"
      query: "variable2_query"
      datasource: "variable2_datasource" 
      value_type: "variable2_value_type"
    - name: "variable3_name" 
      query: "variable3_query"
      datasource: "variable3_datasource" 
      value_type: "variable3_value_type"
  mode: "monitor"
  selector:
    matchLabel: "app.kubernetes.io/name"
    matchLabelValue: "deployment_value"
    matchRoute: ""
    matchURI: ""
    matchService: ""
  datasource:
    name: "prometheus"
    value: "prometheus_URL"
`

