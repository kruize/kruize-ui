export default `[
    {
      "version": "v2.0",
      "experiment_name": "subsitute_experiment_name",
      "cluster_name": "subsitute_cluster_name",
      "performance_profile": "resource-optimization-local-monitoring",
      "metadata_profile": "cluster-metadata-local-monitoring",
      "mode": "monitor",
      "target_cluster": "local",
      "kubernetes_objects": [
        {
          "type": "subsitute_workload_type",
          "name": "subsitute_workload_name",
          "namespace": "subsitute_namespace",
          "containers": [
            {
              "container_image_name": "subsitute_container_image",
              "container_name": "subsitute_container_name"
            }
          ]
        }
      ],
      "trial_settings": {
        "measurement_duration": "15min"
      },
      "recommendation_settings": {
        "threshold": "0.1"
      },
      "datasource":"subsitute_datasource_name"
    }
  ]`;