package fieldcheck

import "testing"

func TestReviewPreservesStableOrder(t *testing.T) {
	result := Review(map[Signal]bool{
		ServiceAreaTruth: true,
		OfferClarity:     true,
	})

	if got, want := len(result.Observed), 2; got != want {
		t.Fatalf("observed count = %d, want %d", got, want)
	}
	if got, want := result.Missing[0], LocalSpecificity; got != want {
		t.Fatalf("first missing signal = %q, want %q", got, want)
	}
	if result.Complete() {
		t.Fatal("incomplete review reported complete")
	}
}

func TestCompleteReview(t *testing.T) {
	observed := make(map[Signal]bool, len(AllSignals))
	for _, signal := range AllSignals {
		observed[signal] = true
	}

	if !Review(observed).Complete() {
		t.Fatal("complete review reported missing signals")
	}
}
