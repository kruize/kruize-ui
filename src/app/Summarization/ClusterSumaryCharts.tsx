import { PageSection, PageSectionVariants, TextContent, TextVariants, Text } from '@patternfly/react-core';
import React from 'react';
import {BarChart} from '@app/Components/BarChart';

const ClusterSummaryCharts = () => {
   
    // return ( 
    //     <PageSection variant={PageSectionVariants.light}>
    //          <TextContent>
    //             <Text component={TextVariants.h1}>
    //     Cluster name 
    //             </Text>
    //         </TextContent>
    //       </PageSection>
    // )

      const jsonData = 
        {
          "cluster_name": "cluster-one-division-bell",
          "summary": {
            "data": {
              "2023-07-11T14:00:50.511Z": {
                "duration_based": {
                  "short_term": {
                    "current": {
                      "requests": {
                        "memory": {
                          "amount": 490.93,
                          "format": "MiB"
                        },
                        "cpu": {
                          "amount": 1.46,
                          "format": "cores"
                        }
                      },
                      "limits": {
                        "memory": {
                          "amount": 712.21,
                          "format": "MiB"
                        },
                        "cpu": {
                          "amount": 1.54,
                          "format": "cores"
                        }
                      }
                    },
                    "config": {
                      "requests": {
                        "memory": {
                          "amount": 1197.9840000000002,
                          "format": "MiB"
                        },
                        "cpu": {
                          "amount": 7.68,
                          "format": "cores"
                        }
                      },
                      "limits": {
                        "memory": {
                          "amount": 1197.9840000000002,
                          "format": "MiB"
                        },
                        "cpu": {
                          "amount": 7.68,
                          "format": "cores"
                        }
                      }
                    },
                    "change": {
                      "increase": {
                        "requests": {
                          "memory": {
                            "amount": 707.0540000000001,
                            "format": "MiB"
                          },
                          "cpu": {
                            "amount": 6.22,
                            "format": "cores"
                          }
                        },
                        "limits": {
                          "memory": {
                            "amount": 485.7740000000001,
                            "format": "MiB"
                          },
                          "cpu": {
                            "amount": 6.14,
                            "format": "cores"
                          }
                        }
                      },
                      "decrease": {
                        "requests": {
                          "memory": {
                            "amount": 707.0540000000001,
                            "format": "MiB"
                          },
                          "cpu": {
                            "amount": 6.22,
                            "format": "cores"
                          }
                        },
                        "limits": {
                          "memory": {
                            "amount": 485.7740000000001,
                            "format": "MiB"
                          },
                          "cpu": {
                            "amount": 6.14,
                            "format": "cores"
                          }
                        }
                      },
                      "variation": {
                        "requests": {
                          "memory": {
                            "amount": 707.0540000000001,
                            "format": "MiB"
                          },
                          "cpu": {
                            "amount": 6.22,
                            "format": "cores"
                          }
                        },
                        "limits": {
                          "memory": {
                            "amount": 485.7740000000001,
                            "format": "MiB"
                          },
                          "cpu": {
                            "amount": 6.14,
                            "format": "cores"
                          }
                        }
                      }
                    }
                  },
                  "medium_term": {},
                  "long_term": {}
                },
                "profile_based": {
                  "cost": {},
                  "balanced": {},
                  "performance": {}
                 }
               }
            },
            "notifications_summary": {
              "info":10,
              "notice": 10,
              "warning": 0,
              "error": 5,
              "critical": 0
            },
            "namespaces": {
              "count": 3,
              "names": [
                "ns1", 
                "ns2", 
                "ns3"
                ]
            }
          }
        }
    
      // Extracting the first timestamp from the data object
const firstTimestamp = Object.keys(jsonData.summary.data)[0];

// Extracting the values for increase, decrease, and variation amounts for CPU for the first timestamp
const increaseAmountCPU = jsonData.summary.data[firstTimestamp].duration_based.short_term.change.increase.requests.cpu.amount;
const decreaseAmountCPU = jsonData.summary.data[firstTimestamp].duration_based.short_term.change.decrease.requests.cpu.amount;
const variationAmountCPU = jsonData.summary.data[firstTimestamp].duration_based.short_term.change.variation.requests.cpu.amount;

    
const data = [
  { name: 'increase', x: jsonData.cluster_name, y: increaseAmountCPU },

  { name: 'decrease', x: jsonData.cluster_name, y: decreaseAmountCPU },

  { name: 'variation', x: jsonData.cluster_name, y: variationAmountCPU },

];
      const legendData = [
        { name: 'increase' },
        { name: 'decrease' },
        { name: 'variation' },
      ];
    
      const domain = { y: [0, 9] };
    
      const domainPadding = { x: [30, 25] };
    
      return (
        <div>
          <h1>{jsonData.cluster_name}</h1>
          <BarChart
            data={data}
            title="Pets"
            legendData={legendData}
            domain={domain}
            domainPadding={domainPadding}
            width={600}
            height={300}
          />
        </div>
      );
    };
    
  
    
export { ClusterSummaryCharts}
