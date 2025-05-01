<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Expense Report</title>
    <style>
        @font-face {
            font-family: 'DejaVu Sans';
            font-style: normal;
            font-weight: normal;
            src: url('fonts/DejaVuSans.ttf') format('truetype');
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 14px;
            margin: 20px;
        }

        h2, h3 {
            margin-bottom: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 8px 10px;
            border: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f5f5f5;
        }

        .group-section {
            margin-bottom: 30px;
        }

        .summary {
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h2>Expense Report</h2>
    <p><strong>User:</strong> {{ $user->name }} ({{ $user->email }})</p>
    <p><strong>Date:</strong> {{ now()->format('d M Y') }}</p>
    <hr>
    @forelse ($groups as $group)
        <div class="group-section">
            <h3>Group: {{ $group->name }}</h3>

            @if ($group->expenses->count())
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Expense Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($group->expenses as $index => $expense)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td>{{ $expense->name }}</td>
                                <td>₹{{ number_format($expense->amount, 2) }}</td>
                                <td>{{ \Carbon\Carbon::parse($expense->date)->format('d M Y') }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <p>No expenses in this group.</p>
            @endif
        </div>
    @empty
        <p>No groups found.</p>
    @endforelse


</body>
</html>

