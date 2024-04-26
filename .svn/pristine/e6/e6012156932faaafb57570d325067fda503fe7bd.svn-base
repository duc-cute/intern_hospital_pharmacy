import React, { useMemo, forwardRef } from 'react'

function Print({ id, children, style }, ref) {
    return (
        <section id={id} style={{ display: 'none' }}>
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html: `
                    @media print {
                        * {
                        font-family: Times New Roman;
                        margin: 0;
                        padding: 0;
                        text-indent: 0;
                        -moz-print-color-adjust: exact;
                        -ms-print-color-adjust: exact;
                        -webkit-print-color-adjust: exact !important;
                        }

                        .radio-print-label,
                        .checked-print-label {
                            display: flex;
                            align-items: center;
                            width: 100%;
                            gap: 2px;
                        }
    
                        .radio-print {
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            box-sizing: border-box; 
                            border: 1px solid #000000;
                            padding: 1px;
                        }
    
                        .checked-print {
                            width: 10px;
                            height: 10px;
                            box-sizing: border-box;
                            border: 1.5px solid #000000;
                            font-size: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
    
                        table {
                            width:100%;
                            border-collapse:collapse;
                        }
    
                        td,
                        th {
                            border: 1px solid #222;
                            box-shadow: none;
                            padding: 2pt 4pt;
                            font-size: 12px;
                            width: max-content;
                        }
    
                        .inline-block {
                            display: inline-block;
                        }
                        .flex {
                            display: flex;
                        }
    
                        .flex-column {
                          display: flex;
                          flex-direction: column;
                        }
    
                        .grid {
                            width: 100%;
                            display: grid;
                            grid-template-columns: repeat(12, minmax(0, 1fr));
                            box-sizing: border-box;
                        }
    
                        .justify-around {
                            justify-content: space-around;
                        }
    
                        .justify-between {
                            justify-content: space-between;
                        }
    
                        .justify-end {
                          justify-content: flex-end;
                        }
    
                        .justify-start {
                            justify-content: flex-start;
                        }
    
                        .justify-center {
                            justify-content: center;
                        }
    
                        .justify-evenly {
                            justify-content: space-evenly;
                        }
    
                        .align-center {
                            align-items: center;
                        }
    
                        .align-start {
                            align-items: flex-start;
                        }
    
                        .align-baseline {
                            align-items: baseline;
                        }
    
                        .flex-wrap {
                            flex-wrap: flex-wrap;
                        }
    
                        .text-end {
                            text-align: end;
                        }
    
                        .text-left {
                            text-align: left;
                        }
    
                        .text-center {
                            text-align: center;
                        }
    
                        .direction-column {
                            flex-direction: column;
                        }
    
                        .flex-wrap {
                            flex-wrap: wrap;
                        }
    
                        ${useMemo(() => Array.from({ length: 12 }).map((_, index) => (
                        `
                            .col-${index + 1} {
                                grid-column: span ${index + 1};
                            }
                            `
                    )).join(" "), [])}
    
                        ${useMemo(() => Array.from({ length: 51 }).map((_, index) => (
                        `
                            .mr-${index}, .m-${index} {
                                margin-right: ${index}px;
                            }   
                            .ml-${index}, .m-${index} {
                                margin-left: ${index}px;
                            }  
                            .mt-${index}, .m-${index} {
                                margin-top: ${index}px;
                            }   
                            .mb-${index}, .m-${index} {
                                margin-bottom: ${index}px;
                            }
                            .pr-${index}, .p-${index} {
                                padding-right: ${index}px;
                            }   
                            .pl-${index}, .p-${index} {
                                padding-left: ${index}px;
                            }  
                            .pt-${index}, .p-${index} {
                                padding-top: ${index}px;
                            }   
                            .pb-${index}, .p-${index} {
                                padding-bottom: ${index}px;
                            }
                            .pr-${index}pt, .p-${index}pt {
                                padding-right: ${index}pt;
                            }   
                            .pl-${index}pt, .p-${index}pt {
                                padding-left: ${index}pt;
                            }  
                            .pt-${index}pt, .p-${index}pt {
                                padding-top: ${index}pt;
                            }   
                            .pb-${index}pt, .p-${index}pt {
                                padding-bottom: ${index}pt;
                            }
                            .text-${index} {
                                font-size: ${index}px;
                            }
                            .gap-${index} {
                                gap: ${index}px;
                            }
                            .h-${index} {
                                height: ${index}px;
                            }
                            .b-${index}pt {
                                border: ${index}pt solid #000;
                            }
                            .b-b-w${index}pt {
                                border-bottom-width: ${index}pt;
                            }
                            .b-t-w${index}pt {
                                border-top-width: ${index}pt;
                            }
                            `
                    )).join(" "), [])}

                    .text-right {
                        text-align: right;
                    }
    
                        .w-100% {
                            width: 100%;
                        }
    
                        .w-33% {
                            width: 33%;
                        }
    
                        .w-55% {
                            width: 55%;
                        } 
                        .w-content {
                            width: max-content;
                        }
    
                        @page { 
                            margin: 8mm;
                        }
                        ${style}
                        
                    }
                }
                    `,
                }}
            />
            <div ref={ref}>
                {children}
            </div>
        </section>
    )
}

export default forwardRef(Print)