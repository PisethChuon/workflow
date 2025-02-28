import { createMachine, assign } from 'xstate';

// Helper function to update history
const updateHistory = (context, event, action) => {
  const history = context.history || [];
  return [...history, {
    action,
    data: event?.data || null,
    comment: event?.comment || '',
    timestamp: new Date()
  }];
};

// Define state machine configuration
export const createWorkflowMachine = () => {
  return createMachine({
    id: 'emergency_incident',
    initial: 'submission',
    context: {
      formData: null,
      history: [],
      comments: '',
    },
    states: {
      submission: {
        on: {
          SUBMIT: {
            target: 'duty_sgt_verify',
            actions: assign({
              formData: (_, event) => event?.data || null,
              history: (ctx, evt) => updateHistory(ctx, evt, 'SUBMIT')
            })
          }
        }
      },
      duty_sgt_verify: {
        on: {
          VERIFY: {
            target: 'hod_review',
            actions: assign({
              comments: (_, event) => event?.comment || '',
              history: (ctx, evt) => updateHistory(ctx, evt, 'VERIFY')
            })
          },
          REJECT: {
            target: 'rejected_notification',
            actions: assign({
              comments: (_, event) => event?.comment || '',
              history: (ctx, evt) => updateHistory(ctx, evt, 'REJECT')
            })
          },
          REWORK: {
            target: 'requestor_rework',
            actions: assign({
              comments: (_, event) => event?.comment || '',
              history: (ctx, evt) => updateHistory(ctx, evt, 'REWORK')
            })
          }
        }
      },
      hod_review: {
        on: {
          REVIEW: 'email_notification',
          REJECT: 'rejected_notification',
          REWORK: 'requestor_rework'
        }
      },
      requestor_rework: {
        on: {
          RESUBMIT: 'duty_sgt_verify',
          CANCEL: 'request_cancelation'
        }
      },
      rejected_notification: {
        type: 'final'
      },
      request_cancelation: {
        type: 'final'
      },
      email_notification: {
        type: 'final'  // Changed this state to be final
      }
    }
  });
};

// Create a static machine workflowinstance
export const workflowMachine = createWorkflowMachine();

// Map xstates to BPMNN
export const stateToElementMap = {
  'submission': 'ACTIVITY_SUBMISSION',
  'duty_sgt_verify': 'Activity_0ub3n3p',
  'hod_review': 'Activity_0vbeuq7',
  'requestor_rework': 'Activity_1eo5pv1',
  'rejected_notification': 'Activity_1ueggfp',
  'request_cancelation': 'Activity_1p56wu8',
  'email_notification': 'Activity_18l6rjx'
};

// Helper functions for state management
export const getElementIdForState = (stateName) => stateToElementMap[stateName] || null;

//last state
export const isStateFinal = (stateName) => {
  return ['rejected_notification', 'request_cancelation', 'email_notification'].includes(stateName);
};
