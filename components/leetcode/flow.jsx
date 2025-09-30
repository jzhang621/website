'use client';

import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Node Component for circular nodes
const CircleNode = ({ data }) => {
  return (
    <div style={{
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: data.color || '#ffd93d',
      border: data.isActive ? '5px solid #00CEFF' : '3px solid #333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
      textAlign: 'center',
      padding: '10px',
      boxShadow: data.isActive ? '0 0 20px rgba(255, 107, 107, 0.6)' : '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      transform: data.isActive ? 'scale(1.1)' : 'scale(1)',
      position: 'relative'
    }}>
      {/* <div style={{ fontSize: '32px', marginBottom: '5px' }}>{data.number}</div> */}
      <div style={{ fontSize: '14px', lineHeight: '1.2' }}>{data.label}</div>
      {/* {data.detail && (
        <div style={{ fontSize: '10px', marginTop: '5px', fontStyle: 'italic', opacity: 0.8 }}>
          {data.detail}
        </div>
      )} */}
      <Handle type="target" id="left" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" id="right" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" id="top" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" id="bottom" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};

// Custom Diamond Node for decisions
const DiamondNode = ({ data }) => {
  return (
    <div style={{
      width: '140px',
      height: '140px',
      background: data.color || '#ce93d8',
      transform: 'rotate(45deg)',
      border: data.isActive ? '5px solid #00CEFF' : '3px solid #333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: data.isActive ? '0 0 20px rgba(255, 107, 107, 0.6)' : '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      <div style={{
        transform: 'rotate(-45deg)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        padding: '10px'
      }}>
        <div style={{ fontSize: '18px', lineHeight: '1.2' }}>{data.label}</div>
        {/* {data.detail && (
          <div style={{ fontSize: '10px', marginTop: '5px', fontStyle: 'italic', opacity: 0.8 }}>
            {data.detail}
          </div>
        )} */}
      </div>
      <Handle type="target" id="left" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" id="right" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" id="top" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" id="bottom" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};

// Custom iteration counter node
const IterationCounter = ({ data }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '15px 25px',
      borderRadius: '12px',
      fontWeight: 'bold',
      fontSize: '16px',
      border: '3px solid #fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '12px', opacity: 0.9 }}>Current Iteration</div>
      <div style={{ fontSize: '32px', marginTop: '5px' }}>{data.iteration}</div>
      <div style={{ fontSize: '11px', marginTop: '5px', opacity: 0.8 }}>{data.detail}</div>
    </div>
  );
};

const nodeTypes = {
  circle: CircleNode,
  diamond: DiamondNode,
  counter: IterationCounter
};

export default function ReactFlowSample() {
  const [currentStep, setCurrentStep] = useState(0);
  const [iteration, setIteration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Define the flow steps with iteration awareness
  const steps = [
    { node: 'initialize', iteration: 0, message: 'Initialize variables' },
    { node: 'add_curr', iteration: 0, message: 'Add current element to sum' },
    { node: 'found_target', iteration: 0, message: 'Check if target found' },
    { node: 'increment_count', iteration: 0, message: 'Increment count (target found)' },
    { node: 'update_hashmap', iteration: 0, message: 'Update hashmap' },
    // Second iteration
    { node: 'add_curr', iteration: 1, message: 'Add current element to sum' },
    { node: 'found_target', iteration: 1, message: 'Check if target found' },
    { node: 'update_hashmap', iteration: 1, message: 'Update hashmap (no target)' },
    // Third iteration
    { node: 'add_curr', iteration: 2, message: 'Add current element to sum' },
    { node: 'found_target', iteration: 2, message: 'Check if target found' },
    { node: 'increment_count', iteration: 2, message: 'Increment count (target found)' },
    { node: 'update_hashmap', iteration: 2, message: 'Update hashmap' },
    { node: 'return_count', iteration: 2, message: 'Return final count' }
  ];

  const currentStepData = steps[currentStep] || steps[0];

  const initialNodes = [
    {
      id: 'initialize',
      type: 'circle',
      position: { x: 200, y: 200 },
      data: { 
        number: '1', 
        label: 'initialize',
        detail: 'sum = 0, count = 0, map = {0: 1}',
        color: '#00CEFF',
        isActive: currentStepData.node === 'initialize'
      }
    },
    {
      id: 'add_curr',
      type: 'circle',
      position: { x: 400, y: 200 },
      data: { 
        number: '2', 
        label: 'add curr to sum',
        detail: 'sum += current',
        color: '#00D084',
        isActive: currentStepData.node === 'add_curr'
      }
    },
    {
      id: 'found_target',
      type: 'diamond',
      position: { x: 600, y: 200 },
      data: { 
        number: '3', 
        label: 'found target?',
        detail: 'target = sum - k, target in map?',
        color: '#00D084',
        isActive: currentStepData.node === 'found_target'
      }
    },
    {
      id: 'increment_count',
      type: 'circle',
      position: { x: 800, y: 100 },
      data: { 
        number: '4', 
        label: 'increment count',
        detail: 'count += map[target]',
        color: '#00D084',
        isActive: currentStepData.node === 'increment_count'
      }
    },
    {
      id: 'update_hashmap',
      type: 'circle',
      position: { x: 800, y: 300 },
      data: { 
        number: '5', 
        label: 'update hashmap',
        detail: 'map[sum] += 1',
        color: '#00D084',
        isActive: currentStepData.node === 'update_hashmap'
      }
    },
    {
      id: 'return_count',
      type: 'circle',
      position: { x: 1000, y: 200 },
      data: { 
        number: '6', 
        label: 'return count',
        detail: 'Return result',
        color: '#00CEFF',
        isActive: currentStepData.node === 'return_count'
      }
    }
  ];

  const initialEdges = [
    { 
      id: 'e-init-add', 
      source: 'initialize', 
      target: 'add_curr',
      label: 'iterate',
      sourceHandle: 'right',
      targetHandle: 'left',
      animated: currentStepData.node === 'initialize',
      style: { stroke: currentStepData.node === 'initialize' ? '#00CEFF' : '#999', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: currentStepData.node === 'initialize' ? '#00CEFF' : '#999'
      }
    },
    { 
      id: 'e-add-found', 
      source: 'add_curr', 
      target: 'found_target',
      sourceHandle: 'right',
      targetHandle: 'left',
      animated: currentStepData.node === 'add_curr',
      style: { stroke: currentStepData.node === 'add_curr' ? '#00D084' : '#999', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: currentStepData.node === 'update_hashmap' && currentStep < steps.length - 2 ? '#00D084' : '#999'
      }
    },
    { 
      id: 'e-found-increment', 
      source: 'found_target', 
      target: 'increment_count',
      label: 'True',
      sourceHandle: 'right',
      targetHandle: 'left',
      animated: currentStepData.node === 'found_target' && currentStep < 15,
      style: { stroke: currentStepData.node === 'found_target' && currentStep < 15 ? '#00D084' : '#999', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: currentStepData.node === 'update_hashmap' && currentStep < steps.length - 2 ? '#FCB900' : '#999'
      }
    },
    { 
      id: 'e-found-update', 
      source: 'found_target', 
      target: 'update_hashmap',
      label: 'False',
      sourceHandle: 'right',
      targetHandle: 'top',
      animated: currentStepData.node === 'found_target' && currentStep >= 15,
      style: { stroke: currentStepData.node === 'found_target' && currentStep >= 15 ? '#FCB900' : '#999', strokeWidth: 3 }
    },
    { 
      id: 'e-increment-update', 
      source: 'increment_count', 
      target: 'update_hashmap',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      animated: currentStepData.node === 'increment_count',
      style: { stroke: currentStepData.node === 'increment_count' ? '#00D084' : '#999', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: currentStepData.node === 'update_hashmap' && currentStep < steps.length - 2 ? '#FCB900' : '#999'
      }
    },
    { 
      id: 'e-update-add', 
      source: 'update_hashmap', 
      target: 'add_curr',
      label: 'loop',
      type: 'straight',
      sourceHandle: 'left',
      targetHandle: 'left',
      animated: currentStepData.node === 'update_hashmap' && currentStep < steps.length - 2,
      style: { 
        stroke: currentStepData.node === 'update_hashmap' && currentStep < steps.length - 2 ? '#FCB900' : '#999', 
        strokeWidth: 3,
        strokeDasharray: '5,5'
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: currentStepData.node === 'update_hashmap' && currentStep < steps.length - 2 ? '#FCB900' : '#999'
      }
    },
    { 
      id: 'e-update-return', 
      source: 'update_hashmap', 
      target: 'return_count',
      label: 'exit',
      sourceHandle: 'right',
      targetHandle: 'left',
      animated: currentStepData.node === 'update_hashmap' && currentStep >= steps.length - 2,
      style: { stroke: currentStepData.node === 'update_hashmap' && currentStep >= steps.length - 2 ? '#00CEFF' : '#999', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: currentStepData.node === 'update_hashmap' && currentStep >= steps.length - 2 ? '#00CEFF' : '#999'
      }
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when step changes
  React.useEffect(() => {
    const stepData = steps[currentStep] || steps[0];
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isActive: node.id === stepData.node,
          iteration: node.id === 'counter' ? stepData.iteration : node.data.iteration,
          detail: node.id === 'counter' 
            ? `Step ${currentStep + 1}/${steps.length}`
            : node.id === 'process'
            ? `arr[${stepData.iteration}]`
            : node.data.detail
        }
      }))
    );

    setEdges((eds) =>
      eds.map((edge) => {
        const isActive = 
          (edge.id === 'e-init-add' && stepData.node === 'initialize') ||
          (edge.id === 'e-add-found' && stepData.node === 'add_curr') ||
          (edge.id === 'e-found-increment' && stepData.node === 'found_target' && currentStep < 8) ||
          (edge.id === 'e-found-update' && stepData.node === 'found_target' && currentStep >= 8) ||
          (edge.id === 'e-increment-update' && stepData.node === 'increment_count') ||
          (edge.id === 'e-update-add' && stepData.node === 'update_hashmap' && currentStep < steps.length - 2) ||
          (edge.id === 'e-update-return' && stepData.node === 'update_hashmap' && currentStep >= steps.length - 2);

        return {
          ...edge,
          // animated: isActive,
          animated: false,
          style: {
            ...edge.style,
            stroke: isActive ? (edge.id.includes('update-add') ? '#FCB900' : edge.id.includes('found-increment') ? '#00D084' : edge.id.includes('found-update') ? '#FCB900' : edge.id.includes('update-return') ? '#00CEFF' : edge.id.includes('add-found') ? '#00D084' : '#00CEFF') : '#999'
          },
          markerEnd: {
            ...edge.markerEnd,
            color: isActive ? (edge.id.includes('update-add') ? '#FCB900' : edge.id.includes('found-increment') ? '#00D084' : edge.id.includes('found-update') ? '#FCB900' : edge.id.includes('update-return') ? '#00CEFF' : edge.id.includes('add-found') ? '#00D084' : '#00CEFF') : '#999'
          }
        };
      })
    );

    setIteration(stepData.iteration);
  }, [currentStep, setNodes, setEdges]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIteration(0);
    setIsPlaying(false);
  };

  React.useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(nextStep, 800);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep]);

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-white shadow-lg p-4 z-10">
       
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4 rounded">
          <p className="font-semibold text-gray-800">{currentStepData.message}</p>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            ← Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Next →
          </button>
          <button
            onClick={reset}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            🔄 Reset
          </button>
          <div className="bg-white px-4 py-2 rounded-lg border-2 border-gray-300 font-mono">
            Step: {currentStep + 1} / {steps.length}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#ddd" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}